import { useTranslation, Trans } from "next-i18next";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import * as React from "react";
import {
  Box,
  Card,
  CardContent,
  Stack,
  Typography,
  Unstable_Grid2 as Grid,
} from "@mui/material";
import {
  faBilibili,
  faGithub,
  faTwitter,
  faYoutube,
} from "@fortawesome/free-brands-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import { Button, Link } from "@/components/common";
import { IndexRecommendCard } from "@/components/IndexRecommendCard";
import Head from "next/head";
import InfoIcon from "@mui/icons-material/Info";
import OpenInNewIcon from "@mui/icons-material/OpenInNew";

export default function Home() {
  const { t, i18n } = useTranslation(["index", "common"]);
  const lang = i18n.language;

  return (
    <>
      <Head>
        <meta name="description" content={t("desc") ?? ""} key="desc" />
        <link
          rel="canonical"
          href={`https://aff.arcaea.icu/`}
          key="canonical"
        />
      </Head>
      <Stack spacing={2} sx={{ mb: 2 }}>
        <Box>
          <Typography variant={"h3"}>
            <Trans t={t}>AFF工具箱</Trans>
          </Typography>
          <Typography variant="h6">
            <Trans t={t}>一个Arcaea谱面段落生成工具</Trans>
          </Typography>
        </Box>
        <Card
          sx={{
            backgroundColor: (theme) => theme.palette.primary.main,
            color: (theme) => theme.palette.primary.contrastText,
          }}
        >
          <Box sx={{ p: 2, display: "flex", alignItems: "center" }}>
            <InfoIcon sx={{ mr: 2, display: { xs: "none", sm: "inherit" } }} />
            <Typography>
              <Trans t={t}>您正在使用AFF工具箱的下个主要版本。</Trans>
            </Typography>
          </Box>
          <Box
            sx={{
              p: 2,
              pt: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "right",
            }}
          >
            <Button
              variant="text"
              sx={{
                color: (theme) => theme.palette.primary.contrastText,
              }}
              href="https://legacy.aff.arcaea.icu/"
              startIcon={<OpenInNewIcon />}
            >
              <Trans t={t}>返回旧版</Trans>
            </Button>
          </Box>
        </Card>
        {/* 信息介绍卡片 */}
        <Card>
          <CardContent>
            <Stack spacing={2}>
              <>
                <Typography variant="h5">
                  <Trans t={t}>这是什么？</Trans>
                </Typography>
                <Typography variant="body1">
                  <Trans t={t}>AFF工具箱是一个用于生成</Trans>
                  <Link href="https://arcaea.lowiro.com/">Arcaea</Link>
                  <Trans t={t}>
                    谱面段落的工具。
                    Arcaea是一款由lowiro开发的创新立体节奏游戏。
                  </Trans>
                </Typography>
                <Typography variant="body1">
                  <Trans t={t}>
                    如果您还不了解Arcaea自制、谱面结构、语句等基础内容，这个工具可能不怎么适合你。
                  </Trans>
                </Typography>
              </>
              <div />
              <>
                <Typography variant="h5">
                  <Trans t={t}>如何使用？</Trans>
                </Typography>
                <Typography variant="body1">
                  <Trans t={t}>
                    通过左上角的菜单按钮选择您想生成的段落种类。之后只需输入参数，再点击右下角的生成按钮就可以将生成好的谱面段落复制到剪贴板！
                  </Trans>
                </Typography>
              </>
              <div />
              <>
                <Typography variant="h5">
                  <Trans t={t}>有什么推荐的工具吗？</Trans>
                </Typography>
                <Typography variant="body1">
                  <Trans t={t}>这个</Trans>
                  <Link href="https://www.bilibili.com/video/BV1RR4y1J7sL">
                    <Trans t={t}>介绍视频</Trans>
                  </Link>
                  <Trans t={t}>
                    有各个工具的结果预览，请根据您的需要选用。同时，向您推荐这几个最受欢迎的工具：
                  </Trans>
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
                    title={t("tool.arcSplit.name", { ns: "common" })}
                    desc={t("tool.arcSplit.shortDesc", { ns: "common" })}
                    href="/tools/arc-split"
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={4}>
                  <IndexRecommendCard
                    title={t("tool.chartMirror.name", { ns: "common" })}
                    desc={t("tool.chartMirror.shortDesc", { ns: "common" })}
                    href="/tools/chart-offset"
                  />
                </Grid>
                <Grid xs={12} sm={6} lg={4}>
                  <IndexRecommendCard
                    title={t("tool.timingEasing.name", { ns: "common" })}
                    desc={t("tool.timingEasing.shortDesc", { ns: "common" })}
                    href="/tools/timing-easing"
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

                {lang === "zh" ? (
                  <Grid xs="auto">
                    <Button
                      variant="outlined"
                      startIcon={<FontAwesomeIcon icon={faBilibili} />}
                      href="https://space.bilibili.com/2095080"
                    >
                      点儿恐狼
                    </Button>
                  </Grid>
                ) : (
                  <Grid xs="auto">
                    <Button
                      variant="outlined"
                      startIcon={<FontAwesomeIcon icon={faYoutube} />}
                      href="https://www.youtube.com/channel/UCj9sf7D2mFK3uZQHOuZFhkg"
                    >
                      d0td1wf
                    </Button>
                  </Grid>
                )}
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
        <Box>
            <Typography>
              ©️ 2023 .direwolf. Powered by{" "}
              <Link href="https://github.com/feightwywx/arcfutil">
                arcfutil
              </Link>
              .
            </Typography>
            <Link href="https://beian.miit.gov.cn/">皖ICP备20002195号-2</Link>
          </Box>
      </Stack>
    </>
  );
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common", "index"])),
    },
  };
}
