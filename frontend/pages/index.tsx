import { useTranslation } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { useRouter } from "next/router";
import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
  useMediaQuery,
} from "@mui/material";
import {
  faBilibili,
  faGithub,
  faTwitter,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button, Link } from "@/components/common";
import { IndexRecommendCard } from "@/components/IndexRecommendCard";

export default function Home() {
  const router = useRouter();
  const { t, i18n } = useTranslation();

  const isDesktop = useMediaQuery((theme) => theme.breakpoints.up("md"));

  return (
    <Box>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Box>
          <Typography variant={isDesktop ? "h1" : "h3"}>AFF工具箱</Typography>
          <Typography variant="h6">一个Arcaea谱面段落生成工具</Typography>
        </Box>

        {/* 信息介绍卡片 */}
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <>
                <Typography variant="h5">这是什么？</Typography>
                <Typography variant="body1">
                  AFF工具箱是一个用于生成
                  <Link href="https://arcaea.lowiro.com/">Arcaea</Link>
                  谱面段落的工具。 Arcaea是一款由lowiro开发的创新立体节奏游戏。
                </Typography>
                <Typography variant="body1">
                  如果您还不了解Arcaea自制、谱面结构、语句等基础内容，这个工具可能不怎么适合你。
                </Typography>
              </>
              <div />
              <>
                <Typography variant="h5">如何使用？</Typography>
                <Typography variant="body1">
                  通过左上角的菜单按钮选择您想生成的段落种类。之后只需输入参数，再点击右下角的生成按钮就可以将生成好的谱面段落复制到剪贴板！
                </Typography>
              </>
              <div />
              <>
                <Typography variant="h5">有什么推荐的工具吗？</Typography>
                <Typography variant="body1">
                  这个
                  <Link href="https://www.bilibili.com/video/BV1RR4y1J7sL">
                    介绍视频
                  </Link>
                  有各个工具的结果预览，
                  请根据您的需要选用。同时，向您推荐这几个最受欢迎的工具：
                </Typography>
              </>
              <div />
              <Grid
                container
                spacing={2}
                alignItems="stretch"
                justifyContent="flex-start"
              >
                <Grid xs={12} sm={6} lg={4}>
                  <IndexRecommendCard
                    title="Arc分割"
                    desc="将一条完整的Arc切分成多个更短的Arc"
                    href="/arc-cutter"
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={4}>
                  <IndexRecommendCard
                    title="谱面偏移"
                    desc="将整个谱面或者谱面片段偏移指定时间"
                    href="/chart-offset"
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={4}>
                  <IndexRecommendCard
                    title="Timing缓动"
                    desc="利用缓动函数生成一段Timing"
                    href="/timing-easing"
                  />
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>

        {/* 相关链接卡片 */}
        <Card>
          <CardContent sx={{ pt: 3 }}>
            <Stack spacing={2}>
              <Grid container spacing={1}>
                <Grid xs="auto">
                  <Button
                    variant="outlined"
                    startIcon={<FontAwesomeIcon icon={faGithub} />}
                    href="https://github.com/feightwywx/aff-toolbox"
                  >
                    aff-toolbox
                  </Button>
                </Grid>
                <Grid xs="auto">
                  <Button
                    variant="outlined"
                    startIcon={<FontAwesomeIcon icon={faBilibili} />}
                    href="https://space.bilibili.com/2095080"
                  >
                    一只恐狼
                  </Button>
                </Grid>
                <Grid xs="auto">
                  <Button
                    variant="outlined"
                    startIcon={<FontAwesomeIcon icon={faTwitter} />}
                    href="https://twitter.com/0x00F8"
                  >
                    @0x00F8
                  </Button>
                </Grid>
                <Grid xs="auto">
                  <Button
                    variant="outlined"
                    startIcon={<MailOutlineIcon />}
                    href="mailto:canis@direcore.xyz"
                  >
                    canis@direcore.xyz
                  </Button>
                </Grid>
              </Grid>
            </Stack>
          </CardContent>
        </Card>
      </Stack>
    </Box>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "index"])),
      // Will be passed to the page component as props
    },
  };
}
