"""
misc helpers
"""

def safe_int(num_str, default_value=0):
    if num_str is None:
        return default_value

    try:
        num = int(num_str)
        return num
    except ValueError:
        pass

    try:
        num = int(float(num_str))
    except ValueError:
        num = default_value

    return num
