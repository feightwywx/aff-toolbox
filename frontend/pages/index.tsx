import { serverSideTranslations } from 'next-i18next/serverSideTranslations'


export default function Home() {
  return (
    <>
      hello world
    </>
  )
}

export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, ["common"])),
      // Will be passed to the page component as props
    },
  };
}
