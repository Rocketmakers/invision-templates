/* eslint-disable @typescript-eslint/no-unused-vars -- Won't compile without this */
import React from "react";

import {
  Body,
  Button,
  Container,
  Head,
  Heading,
  Hr,
  Html,
  Img,
  Preview,
  Section,
  Text,
} from "@react-email/components";
import {
  main,
  logoContainer,
  logo,
  container,
  box,
  h1,
  paragraph,
  button,
  hr,
  footer,
  buffer,
} from "./styles";

export interface InvisionEmailProps {
  title: string;
  copy: string;
  footerText?: string;
  actionLink?: { href: string; text: string };
}

export const InvisionEmail = ({
  title,
  actionLink,
  copy,
  footerText,
}: InvisionEmailProps) => (
  <Html style={main}>
    <Head />
    <Preview>{title}</Preview>
    <Body style={main}>
      <Container style={logoContainer}>
        <Img
          style={logo}
          src={
            "https://plxbixvnzpcnouznevdw.supabase.co/storage/v1/object/public/email-images/invision-logo-white.png"
          }
          width="150"
          height="33"
          alt="Invision"
          className="mx-auto my-0"
        />
      </Container>
      <Container style={container}>
        <Section style={box}>
          <Heading style={h1}>{title}</Heading>
          <Text style={paragraph} dangerouslySetInnerHTML={{ __html: copy }} />
          {actionLink && (
            <Button style={button} href={actionLink?.href}>
              {actionLink?.text}
            </Button>
          )}
          {footerText && <Text style={paragraph}>{footerText}</Text>}
          <Hr style={hr} />
          <Text style={footer}>Thanks from Team Invision</Text>
        </Section>
      </Container>

      <Container style={buffer} />
    </Body>
  </Html>
);

export default InvisionEmail;

InvisionEmail.PreviewProps = {
  title: "Welcome back!",
  copy: "To access your account, please click the button below.",
  footerText: "This link will expire in 24 hours",
  actionLink: {
    href: "{{returnUrl}}",
    text: "Log into Invision",
  },
} as InvisionEmailProps;
