import { useMemo } from "react";

import CustomHits from "~/components/custom-hits";
import CustomSearchBox from "~/components/custom-search-box";
import { BackButton } from "~/components/layout/back-button";
import { Page } from "~/components/layout/page";
import { PageContent } from "~/components/layout/page-content";
import { PageHeader } from "~/components/layout/page-header";
import faqSheets, { FaqData } from "~/lib/faq-databases";
import { useSearch } from "~/lib/hooks/use-search";
import { typesenseSearch } from "~/lib/typesense";

import { GetStaticProps } from "next";
import { NextSeo } from "next-seo";
import { InstantSearch } from "react-instantsearch-dom";

type FaqsProps = {
  faqSheets: FaqData[];
};

function groupBy<T, U>(data: T[], key: U) {
  return data.reduce((acc: any, currentValue: any) => {
    const groupKey = currentValue[key];
    if (!acc[groupKey]) {
      acc[groupKey] = [];
    }
    acc[groupKey].push(currentValue);
    return acc;
  }, {});
}

const meta = {
  title: "Pertanyaan yang sering ditanyakan",
};

export default function Faqs(props: FaqsProps) {
  const { faqSheets: faq } = props;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [filteredQuestions, handleSubmitKeywords, urlParams, filterItems] =
    useSearch({
      items: faq,
      fieldNames: ["kategori_pertanyaan", "pertanyaan", "jawaban"],
      aggregationSettings: [
        { field: "kategori_pertanyaan", title: "Kategori Pertanyaan" },
      ],
    });

  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const listFaqs = useMemo(() => {
    return groupBy<FaqData | unknown, string>(
      filteredQuestions,
      "kategori_pertanyaan",
    );
  }, [filteredQuestions]);

  const searchClient = typesenseSearch(["pertanyaan", "jawaban"]);

  return (
    <Page>
      <NextSeo openGraph={{ title: meta.title }} title={meta.title} />
      <PageHeader
        backButton={<BackButton href="/" />}
        breadcrumbs={[
          {
            name: "FAQ",
            href: "/faq",
            current: true,
          },
        ]}
        title="Pertanyaan yang sering ditanyakan"
      />
      <PageContent>
        <InstantSearch indexName="wbw-gsheets-faq" searchClient={searchClient}>
          <CustomSearchBox />
          <CustomHits />
        </InstantSearch>
      </PageContent>
    </Page>
  );
}

export const getStaticProps: GetStaticProps = () => {
  return {
    props: {
      faqSheets,
    },
  };
};
