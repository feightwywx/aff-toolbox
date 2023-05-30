import { LinkProps, Link as MuiLink, Button as MuiButton, ButtonProps } from "@mui/material";
import NextLink from "next/link";
import { useRouter } from "next/router";
import React from "react";

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
