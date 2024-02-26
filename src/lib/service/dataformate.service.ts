class DataFormateService {
  normalizePhoneNumber(phoneNumber: string): string {
    // Remove any non-digit characters from the phone number
    const sanitizedNumber = phoneNumber.replace(/\D/g, "");

    // Check if the number starts with '+91' (India country code), if so, remove it
    let normalizedNumber = sanitizedNumber.startsWith("91")
      ? sanitizedNumber.substring(2) // Remove '91'
      : sanitizedNumber;
    // Prepend the international dialing code '+91' if missing
    if (!normalizedNumber.startsWith("+91")) {
      normalizedNumber = `+91${normalizedNumber}`;
    }

    return normalizedNumber;
  }
}

const dataFormateService = new DataFormateService();

export default dataFormateService;
