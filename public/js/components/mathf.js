class CMathf {
  Repeat(val, max = 1, min = 0) {
    if (val > max) {
      return min;
    } else if (val < min) {
      return max;
    } else {
      return val;
    }
  }
  Clamp(val, max = 1, min = 0) {
    if (val > max) {
      return max;
    } else if (val < min) {
      return min;
    } else {
      return val;
    }
  }
}
