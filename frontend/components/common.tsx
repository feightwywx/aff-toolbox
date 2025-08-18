import { ButtonProps, LinkProps, Button as MuiButton, Link as MuiLink } from "@mui/material";

import NextLink from "next/link";
import type React from "react";
import { useRouter } from "next/router";

export const Link: React.FC<LinkProps & { withLocale?: boolean }> = ({
  withLocale,
  ...props
}) => {
  const router = useRouter();
  const href = withLocale ? `/${router.locale}${props.href}` : props.href;

  return (
    <MuiLink
      underline="hover"
      color="secondary"
      component={NextLink}
      {...props}
      href={href}
    />
  );
};

export const Button: React.FC<ButtonProps & { withLocale?: boolean }> = ({
  withLocale,
  ...props
}) => {
  const router = useRouter();
  const href = withLocale ? `/${router.locale}${props.href}` : props.href;

  return (
    <MuiButton
      color="secondary"
      LinkComponent={NextLink}
      {...props}
      href={href}
    />
  );
};
