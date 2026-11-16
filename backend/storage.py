import os
import uuid

import boto3

# S3-compatible object storage (Cloudflare R2). Same client works for AWS S3.
s3 = boto3.client(
    "s3",
    endpoint_url=os.environ["R2_ENDPOINT"],
    aws_access_key_id=os.environ["R2_ACCESS_KEY_ID"],
    aws_secret_access_key=os.environ["R2_SECRET_ACCESS_KEY"],
)


# Allowed phototypes: file extension ->the content type R2 stores with the file
ALLOWED = {"png": "image/png", "jpg": "image/png", "jpeg": "image/jpeg", "webp": "image/webp"}


def is_allowed(filename):
    return "." in filename and filename.rsplit(".", 1)[1].lower() in ALLOWED


# Storage logic - validates, renames, uploads to bucket
# and returns the photo public URL
def store_photo(file):
    """Validate and upload a photo to R2; return its URL, or None if rejected."""
    if not file or file.filename == "" or not is_allowed(file.filename):
        return None
    ext = file.filename.rsplit(".", 1)[1].lower()
    key = f"{uuid.uuid4()}.{ext}"
    s3.upload_fileobj(file, os.environ["R2_BUCKET"], key, ExtraArgs={"ContentType": ALLOWED[ext]})
    return f"{os.environ['R2_PUBLIC_URL']}/{key}"
