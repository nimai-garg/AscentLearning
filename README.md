# Ascent Learning

Four static HTML pages. No build step. Serve the repository over HTTP locally, or upload the HTML files plus css/, js/ and images/ to the existing static host.

## September 2026 update

Georgia remains the display font, including the original home headline. All supporting typography uses Inter, loaded through Google Fonts. Aarushi’s supplied portrait is stored locally and displayed with CSS object positioning. The biography now reflects 10 years in Cupertino Union School District, kindergarten through grade 8, and her supplied interests. The home page introduces Aarushi and uses a consistent company voice. LinkedIn opens in a separate tab. Visible copy avoids hyphens and dash punctuation; HTML attributes, URLs and code identifiers retain required hyphens.

Glass styling uses layered gradients, translucent backgrounds, curved inset highlights, blur, deep shadows, responsive pointer lighting and entrance animations. Reduced motion preferences disable movement. Content remains available without JavaScript. Header and footer source copies are in partials/; keep the embedded copies in each page synchronized.

## Contact form activation required before launch

The form now submits by HTTPS POST to https://formsubmit.co/hello@ascentlearning.net. FormSubmit handles delivery and its default CAPTCHA remains enabled. A honeypot adds spam filtering. Native submission works without JavaScript; JavaScript adds accessible inline validation. There is no simulated success message: visitors complete verification on the provider’s page. Email replies use the parent’s submitted email address.

The owner needs to:

1. Ensure hello@ascentlearning.net exists as a receiving mailbox or alias with your email provider. Changing website text does not create an inbox or configure domain MX records.
2. Serve the site over HTTP or HTTPS, submit a test inquiry, then open the activation email in hello@ascentlearning.net and confirm the form. Check spam if needed.
3. Submit another test after activation and verify the full inquiry reaches the inbox and Reply addresses the parent. Do this on the production domain before inviting families to use the form.

Mailbox access and activation were not available in this editing session, so end to end email delivery has not been verified. If the provider is unreachable, visitors can return to the form or use the adjacent email/phone links. Do not disable CAPTCHA or put email service secrets in browser code.

Provider documentation: https://formsubmit.co/
Design reference: https://developer.apple.com/videos/play/wwdc2025/219/

## Checks

Verify each page at desktop and mobile widths, keyboard navigation, reduced motion, portrait loading, external links and form validation. For a local preview: `python3 -m http.server 4173`.
