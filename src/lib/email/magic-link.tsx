import {
  Body,
  Button,
  Container,
  Head,
  Hr,
  Html,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import { render } from "@react-email/render";

type MagicLinkEmailProps = {
  appName: string;
  url: string;
};

const MagicLinkEmail = ({ appName, url }: MagicLinkEmailProps) => (
  <Html>
    <Head />
    <Preview>Sign in to {appName}</Preview>
    <Body style={styles.body}>
      <Container style={styles.container}>
        <Section>
          <Text style={styles.title}>Sign in to {appName}</Text>
          <Text style={styles.text}>
            Use the button below to securely sign in. This link will expire
            soon.
          </Text>
          <Button href={url} style={styles.button}>
            Sign in
          </Button>
          <Text style={styles.text}>
            If the button does not work, copy and paste this link into your
            browser:
          </Text>
          <Text style={styles.link}>{url}</Text>
        </Section>
        <Hr style={styles.hr} />
        <Text style={styles.footer}>
          If you did not request this email, you can safely ignore it.
        </Text>
      </Container>
    </Body>
  </Html>
);

const styles = {
  body: {
    backgroundColor: "#f5f6f8",
    fontFamily: "Helvetica, Arial, sans-serif",
    margin: "0",
    padding: "24px 12px",
  },
  container: {
    backgroundColor: "#ffffff",
    borderRadius: "12px",
    padding: "32px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.06)",
  },
  title: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#0b0b0c",
    margin: "0 0 12px",
  },
  text: {
    fontSize: "15px",
    lineHeight: "22px",
    color: "#2f2f33",
    margin: "0 0 18px",
  },
  button: {
    display: "inline-block",
    backgroundColor: "#111827",
    color: "#ffffff",
    fontSize: "15px",
    fontWeight: "600",
    padding: "12px 20px",
    borderRadius: "8px",
    textDecoration: "none",
  },
  link: {
    fontSize: "12px",
    color: "#475569",
    wordBreak: "break-all" as const,
    margin: "0 0 18px",
  },
  hr: {
    borderColor: "#e6e8eb",
    margin: "24px 0",
  },
  footer: {
    fontSize: "12px",
    color: "#6b7280",
    margin: 0,
  },
};

const buildMagicLinkEmail = async ({ appName, url }: MagicLinkEmailProps) => {
  const subject = `Sign in to ${appName}`;
  const html = await render(<MagicLinkEmail appName={appName} url={url} />);
  const text = `Sign in to ${appName} using this link: ${url}`;

  return { subject, html, text };
};

export { buildMagicLinkEmail };
