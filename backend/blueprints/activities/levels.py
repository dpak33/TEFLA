score_ranges = {
    (0, 20): "A1",
    (21, 40): "A2",
    (41, 60): "B1",
    (61, 80): "B2",
    (81, 100): "C1",
    (101, 120): "C2"
}

def get_rating(score, score_ranges):
    for (low, high), rating in score_ranges.items():
        if low <= score <= high:
            return rating
    return None