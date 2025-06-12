import { render, pretty } from "@react-email/components";
import InvisionEmail, { InvisionEmailProps } from "./emails/invision";
import { writeFile } from "fs/promises";
import { join } from "path";



async function generate(name: string, props: InvisionEmailProps) {
  const html = await pretty(await render(InvisionEmail(props), {}));

  const basePath = join(__dirname, `../layouts`, name);

  // generate email template
  const outputPath = join(basePath, `html.handlebars`);
  await writeFile(outputPath, html, "utf8");

  // generate plain text version
  const txt = await render(InvisionEmail(props), { plainText: true });
  await writeFile(join(basePath, `txt.handlebars`), txt, "utf8");

  // generate subject
  await writeFile(join(basePath, `subject.handlebars`), `Invision | ${props.title}`, "utf8");
}


async function generateEmails() {

  // applicationUserAdded
  generate("applicationUserAdded", {
    title: "You've been invited to help with an application",
    copy: "You have been invited by {{inviteeName}} to help with an application for {{applicationName}} on the Invision platform. Please click the button below to view the application.",
    actionLink: {
      href: "{{returnUrl}}",
      text: "View application"
    },
    footerText: "This link will expire in 24 hours"
  });

  // applicationUserRemoved
  generate("applicationUserRemoved", {
    title: "You've been removed from an application",
    copy: "You have been removed by {{removeeName}} from an application for {{applicationName}}."
  });

  // createApplication
  generate("createApplication", {
    title: "Verify to continue your application",
    copy: "To verify your account and continue with your application, please click the link below.",
    actionLink: {
      href: "{{returnUrl}}",
      text: "Verify your account"
    },
    footerText: "This link will expire in 24 hours"
  });

  // magicLink
  generate("magicLink", {
    title: "Welcome back!",
    copy: "To access your account, please click the button below.",
    actionLink: {
      href: "{{returnUrl}}",
      text: "Log into Invision"
    },
    footerText: "This link will expire in 24 hours"
  });

  // notRegistered
  generate("notRegistered", {
    title: "Welcome!",
    copy: "It appears you are not registered with Invision. To start a new application and register with us, please click the button below.",
    actionLink: {
      href: "{{returnUrl}}",
      text: "Start a new application"
    },
  });

  // submitApplicationAppointedContact
  generate("submitApplicationAppointedContact", {
    title: "Application Submitted",
    copy: "Thank you for your application. Our underwriter team will be in contact with you regarding your application.",
  });

  // submitApplicationBroker
  generate("submitApplicationBroker", {
    title: "New application available",
    copy: "An application has been submitted to the Invision platform and has elected you as their broker. Our underwriter team will be in contact with you regarding this application.",
  });

  // submitApplicationUnderwriter
  generate("submitApplicationUnderwriter", {
    title: "New application available",
    copy: "A new application is available on the Invision platform. Please click the link below to view it.",
    actionLink: {
      href: "{{returnUrl}}",
      text: "View application"
    }
  });

}

generateEmails();