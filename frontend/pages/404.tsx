import * as React from "react"

import {
  Box,
  Typography
} from "@mui/material"
import Link from "next/link"
import { GetStaticProps } from "next"
import { serverSideTranslations } from "next-i18next/serverSideTranslations"

// markup
const NotFoundPage = () => {
  return (
    <Box>
      <Typography variant="h2">404</Typography>
      <Typography variant='h5'>你似乎来到了空无一人的世界...</Typography>
      <Typography variant='h6'><Link href='/'>回到主页</Link></Typography>
    </Box>
  )
}

export const getStaticProps: GetStaticProps = async ({ locale }) => {
  return {
    props: {
      ...(await serverSideTranslations(locale ?? "zh", ["common", "tools"])),
    },
  };
};

export default NotFoundPage
