import { useEffect } from "react";
import Container from "../components/Container";
import Header from "../components/Header";
import Select from "../components/Select";
import { gombeLgas } from "../utils/utils";
import SpecialLayout from "./SpecialLayout";
import Footer from "../components/Footer";

let lgasOption = gombeLgas;
// lgasOption.unshift({value: 'all', displayText: 'All L.G.As'});

const Staffs: React.FC = () => {
  useEffect(() => {
    document.title = "EMIS - Staffs";
  }, []);
  return (
    <>
      <Header activeId={2} />
      <Container className="pt-[100px] md:pt-[100px] index-container min-h-screen">
        <SpecialLayout>
          <div className="">
            <h1 className="text-2xl text-bold">
              Find information & Statistics About the Staffs in Gombe State
            </h1>
            <form action="">
              <Select
                options={lgasOption}
                label="Select L.G.A"
                name="lga"
                id="lga"
              />
              <Select
                options={[
                  { value: "all", displayText: "All Staffs" },
                  { value: "teaching", displayText: "Teaching Staffs" },
                  { value: "non-teaching", displayText: "Non-Teaching Staffs" },
                ]}
                label="Staffs"
                name="staff"
                id="staff"
              />
            </form>
          </div>
        </SpecialLayout>
      </Container>
      <Footer />
    </>
  );
};

export default Staffs;
