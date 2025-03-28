export default function getErrorMessage(error: unknown) {
    const message = error instanceof Error ? error.message : error
    return message
  }
  