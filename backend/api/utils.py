import os
import cv2
import numpy as np
import pandas as pd
import base64
from api import bcrypt


def list_to_dict(arr):
    print(pd.DataFrame(arr))


def save_image(base64_string, filename):
    _, encoded = base64_string.split(",", 1)
    img_data = np.frombuffer(base64.b64decode(encoded), dtype=np.uint8)
    img = cv2.imdecode(img_data, cv2.IMREAD_UNCHANGED)

    # Convert to PNG format
    img_path = os.path.join('api/static/profile_pictures', filename)
    cv2.imwrite(img_path, img)

    return img_path


def get_bs64_img(path):
    img = cv2.imread(path)

    # encode the image
    _, encoded_img = cv2.imencode('.png', img)
    img_data = encoded_img.tobytes()

    return base64.b64encode(img_data).decode('utf-8')


def hash_password(password: str):
    """Hash password before storing it to database

    Args:
        password (str): The password to hash

    Returns:
        string: The hashed password
    """
    return base64.b64encode(bcrypt.generate_password_hash(password)).decode('utf-8')


def check_hash_password(hash_password: str, password: str):
    """Compare a hashed password againts a plain password

    Args:
        hash_password (str): The hashed password
        password (str): The plain password
    """

    return bcrypt.check_password_hash(base64.b64decode(hash_password), password)


ROLE_ADMIN = 'admin'
ROLE_STAFFUSER = 'staffuser'
