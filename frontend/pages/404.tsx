import * as React from "react"

import {
  Box,
  Typography
} from "@mui/material"
import Link from "next/link"

// markup
const NotFoundPage = () => {
  return (
    <Box>
      <Typography variant="h1">404</Typography>
      <Typography variant='h4'>你似乎来到了空无一人的世界...</Typography>
      <Typography variant='h6'><Link href='/'>回到主页</Link></Typography>
    </Box>
  )
}

export default NotFoundPage
