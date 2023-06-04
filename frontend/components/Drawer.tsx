import React from "react";
import { theme } from "@/utils/theme";
import {
  Box,
  Collapse,
  List,
  ListItemButton,
  ListItemText,
  Toolbar,
  useMediaQuery,
} from "@mui/material";
import type { DrawerProps } from "@mui/material";
import { Drawer as MuiDrawer } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import { useAppDispatch, useAppSelector } from "@/utils/hooks";
import { toggleDrawer } from "@/utils/slices/layout";
import { ListItemSx } from "@/styles/sx";
import { useTranslation } from "next-i18next";
import { useRouter } from "next/router";
import toolMetas from "@/config/modules";
import { category, newModules } from "@/config/category";
import Link from "next/link";

export const drawerWidth = 240;

const Drawer: React.FC<
  Omit<DrawerProps, "content"> & { content?: never }
> = () => {
  const desktop = useMediaQuery(theme.breakpoints.up("md"));
  const open = useAppSelector((state) => state.layout.drawerOpen);
  const dispatch = useAppDispatch();

  const { t, i18n } = useTranslation();
  const router = useRouter();
  const pathname = `/${router.asPath.split('/').slice(-1)}`;

  // 计算一个由模块路径到分类名的映射
  const moduleToCategory = React.useMemo(() => {
    const map = new Map<string, string>();
    toolMetas.forEach((value) => {
      map.set(value.path, value.category);
    });
    return map;
  }, []);

  // 初始化collapse状态
  const initDrawerCollapseState: { [x: string]: boolean } = React.useMemo(
    () =>
      Object.assign(
        {},
        ...category.map((cid) => ({
          [cid]:
            cid === "new" || cid === moduleToCategory.get(pathname)
              ? true
              : false,
        }))
      ),
    [moduleToCategory, pathname]
  );
  const [drawerCollapseState, setDrawerCollapseState] = React.useState(
    initDrawerCollapseState
  );

  // 跳转时维护collapse状态
  React.useEffect(() => {
    const currentCategory = moduleToCategory.get(pathname);
    if (currentCategory !== undefined) {
      setDrawerCollapseState((prev) => ({
        ...prev,
        [currentCategory]: true,
      }));
    }
  }, [pathname, moduleToCategory]);

  const drawerContent = (
    <Box sx={{ p: 1 }}>
      <Box sx={{ overflow: "auto" }}>
        <List dense>
          <Box>
            <ListItemButton
              sx={ListItemSx}
              href={`/${router.locale}`}
              selected={pathname === `/`}
              LinkComponent={Link}
              onClick={() => !desktop && dispatch(toggleDrawer())}
            >
              <ListItemText
                primary={t("home")}
                sx={{
                  color: theme.palette.text.primary,
                }}
              />
            </ListItemButton>
          </Box>

          {/* 生成分类 */}
          {category.map((cid) => (
            <Box key={cid}>
              <ListItemButton
                onClick={() => {
                  setDrawerCollapseState({
                    ...drawerCollapseState,
                    [cid]: !drawerCollapseState[cid],
                  });
                }}
                sx={ListItemSx}
              >
                <ListItemText
                  primary={t(`category.${cid}.name`)}
                  sx={{
                    color: theme.palette.text.primary,
                  }}
                />
                {drawerCollapseState[cid] ? (
                  <ExpandLess
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  />
                ) : (
                  <ExpandMore
                    sx={{
                      color: theme.palette.text.primary,
                    }}
                  />
                )}
              </ListItemButton>

              <Collapse
                in={drawerCollapseState[cid]}
                timeout="auto"
                unmountOnExit
              >
                <List component="div" disablePadding dense sx={{ pl: 2 }}>
                  {/* 生成菜单项 */}
                  {toolMetas
                    .filter((meta) =>
                      cid === "new"
                        ? newModules.includes(meta.id)
                        : meta.category === cid
                    )
                    .map((meta, index) => (
                      <ListItemButton
                        key={index}
                        sx={ListItemSx}
                        href={`/${router.locale}/tools${meta.path}`}
                        selected={meta.path === pathname && cid !== "new"}
                        LinkComponent={Link}
                        onClick={() => !desktop && dispatch(toggleDrawer())}
                      >
                        <ListItemText
                          primary={t(`tool.${meta.id}.name`)}
                          sx={{
                            color: theme.palette.text.primary,
                          }}
                        />
                      </ListItemButton>
                    ))}
                </List>
              </Collapse>
            </Box>
          ))}
        </List>
      </Box>
    </Box>
  );

  return desktop ? (
    <MuiDrawer
      variant="persistent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: {
          width: drawerWidth,
          boxSizing: "border-box",
          borderRightColor: theme.palette.divider,
          backgroundColor: theme.palette.background.default,
          borderRadius: 0,
        },
      }}
      anchor="left"
      open={open}
    >
      <Toolbar sx={{ mb: 1 }} />
      {drawerContent}
    </MuiDrawer>
  ) : (
    // mobile
    <MuiDrawer
      variant="temporary"
      open={!open} // 移动端的drawer默认逻辑和桌面端相反
      onClose={() => dispatch(toggleDrawer())}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        "& .MuiDrawer-paper": {
          boxSizing: "border-box",
          width: drawerWidth,
          mt: { xs: 9, sm: 10 },
          ml: 2,
          height: "70%",
          borderRadius: 4,
        },
      }}
      elevation={8}
    >
      {drawerContent}
    </MuiDrawer>
  );
};

export default Drawer;
