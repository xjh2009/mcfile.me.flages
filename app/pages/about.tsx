import { SiteDetails } from "../util/util";
import { Center, Paper, Title, Text, useMantineColorScheme, Group, Anchor, Code } from "@mantine/core";
import { SideBySide } from "@encode42/mantine-extras";
import { Layout } from "../core/layout/Layout";
import { PageTitle } from "../core/components/PageTitle";
import { FooterRow } from "../core/components/actionButton/FooterRow";
import { HomeLink } from "../core/components/actionButton/HomeLink";
import { Link, Routes } from "blitz";

/**
 * The about page of the site.
 */
function About() {
    const { colorScheme } = useMantineColorScheme();
    const isDark = colorScheme === "dark";

    return (
        <>
            <Center sx={{
                "height": "100%"
            }}>
                <Paper padding="md" shadow="sm" withBorder sx={theme => ({
                    "width": "100%",
                    "backgroundColor": isDark ? theme.colors.dark[6] : theme.colors.gray[0]
                })}>
                    <Group direction="column" grow>
                        <PageTitle />

                        <Group direction="column">
                            <Group direction="column" spacing="xs">
                                <Title order={2}>关于</Title>
                                <Text>{SiteDetails.title} 为你的 Minecraft Java 版服务器生成启动脚本。</Text>
                                <Text>它具有上手即用的简单配置、许多用于优化的参数类型和预制的参数！</Text>
                            </Group>
                            <Group direction="column" spacing="xs">
                                <Title order={2}>支持</Title>
                                <Text>如何使用这个网站：</Text>
                                <Text>
                                    在 <Link href={Routes.Home()} passHref><Anchor>主页</Anchor></Link>，输入你的服务端文件（.jar）的名称。
                                    这个文件将位于你的 Minecraft 服务器的根目录中，所有的配置文件都在这里。
                                    如果你还没有下载服务端，欢迎使用 <Anchor href="https://papermc.io" target="_blank">Paper</Anchor> 或者 <Anchor href="https://purpurmc.org" target="_blank">Purpur</Anchor>！
                                </Text>
                                <Text>
                                    使用滑块输入要分配给服务器的内存量。请确保至少分配 <Code>2 GB</Code> 并且少于你的所有可用内存，让你的操作系统和其他应用程序有喘息的空间。
                                    举个栗子，比如你的机器有 <Code>8 GB</Code> 内存，顶多可以给服务器 <Code>6 GB</Code>。
                                </Text>
                                <Text>
                                    你可以根据你的喜好自定义脚本。你可以选择开关服务端的图形界面、更改要使用的预置参数……我们提供的默认设置大抵可以应付大多数情况。
                                </Text>
                                <Text>
                                    最后，将生成的脚本付诸行动！您可以从结果窗口复制脚本，或点击下载按钮获取现成的脚本。
                                </Text>
                                <Text>如果还有一些问题，欢迎通过 QQ2012036686/QQ群955795553 联系我。</Text>
                            </Group>
                            <Group direction="column" spacing="xs">
                                <Title order={2}>贡献</Title>
                                <Text>前往QQ群955795553 寻找管理人员</Text>
                                <Text>我们欢迎所有贡献。</Text>
                            </Group>
                        </Group>

                        <SideBySide leftSide={
                            <HomeLink filled />
                        } rightSide={
                            <FooterRow />
                        } />
                    </Group>
                </Paper>
            </Center>
        </>
    );
}

About.getLayout = page => <Layout title="About">{page}</Layout>;

export default About;
