import AllArticleTabs from "../component/tabs/allArticle/allArticleTabs";
import AllNotes from "../section/allNotes";
import FilterSection from "../section/filterSection";

export default function Home() {
  return (
    <>
      <FilterSection />
      <AllArticleTabs />
      <AllNotes />
    </>
  );
}
