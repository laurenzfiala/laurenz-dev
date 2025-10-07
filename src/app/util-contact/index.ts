const E_MAIL = 'renz.devmail@lau';

/**
 * Redirects the client to a mailto-address.
 * This is necessary to prevent crawlers from obtaining the mail for spam.
 */
export function sendMail(event: Event) {
  location.href = `mailto:${E_MAIL.substring(8)}${E_MAIL.substring(0, 8)}`;
  event.preventDefault();
}
