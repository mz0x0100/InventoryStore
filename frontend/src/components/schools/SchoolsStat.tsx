import { Text, TextMuted } from "../Text";
import { LGASchoolsStatType } from "../../routes/Schools";
import { useTheme } from "../../utils/contexts/ThemeContext";

interface Props {
  schoolsStats: LGASchoolsStatType[];
}
const SchoolsStat: React.FC<Props> = ({ schoolsStats }) => {
  const { theme } = useTheme();

  const themeBg = theme == "classic" ? "theme-bg" : "bg-blue-100";

  return (
    <div className="lg:grid lg:grid-cols-2 lg:gap-4 mt-4">
      {schoolsStats.map((stat, key) => (
        <div
          className={`relative mb-8 w-full mx-auto ${themeBg} rounded p-6 shadow-md`}
          key={key}
        >
          <i
            className="absolute top-2 right-6 fa fa-download text-gray-600 cursor-pointer"
            title="Download data"
          />
          <TextMuted className="text-xl font-weight-700 text-center">
            {stat.lga}
          </TextMuted>
          <div className="md:grid md:grid-cols-2 md:gap-4 mt-4">
            <div>
              <TextMuted className="text-center">Total schools:</TextMuted>
              <p className="text-3xl font-bold text-blue-500 text-center">
                {stat.overall_schools_total}
              </p>
            </div>
            <div>
              <TextMuted className="text-center">Total enrollments:</TextMuted>
              <p className="text-3xl font-bold text-blue-500 text-center">
                {stat.overall_enrollment_total}
              </p>
            </div>
          </div>
          <TextMuted className="text-center mb-4 p-2 border-b-2 font-weight-800 border-primary text-lg">
            Type sector
          </TextMuted>
          <div className="md:grid md:grid-cols-2 gap-2">
            <Inline
              title="Pre-primary & primary"
              text={stat.total_pre_and_primary}
            />
            <Inline title="Junior secondary" text={stat.total_junior_sec} />
            <Inline title="Senoir secondary" text={stat.total_senior_sec} />
            <Inline
              title="Private education"
              text={stat.total_private_education}
            />
            <Inline
              title="Science & vocational"
              text={stat.total_sci_and_vocational}
            />
          </div>
          <TextMuted className="text-center mb-4 p-2 border-b-2 font-weight-800 border-primary text-lg">
            Enrollments
          </TextMuted>
          <div className="md:grid md:grid-cols-2 md:gap-2">
            <div>
              <TextMuted className="text-center mb-4 p-2 border-b-2 font-weight-800 border-primary text-lg">
                Pre-primary & primary
              </TextMuted>
              <div className="grid grid-cols-2 gap-2">
                <Inline
                  title="Male"
                  text={stat.pre_and_primary_enrollment.male}
                />
                <Inline
                  title="Female"
                  text={stat.pre_and_primary_enrollment.female}
                />
              </div>
              <TextMuted className="text-center font-bold">Total</TextMuted>
              <Text className="text-green-500 font-weight-800 text-center">
                {stat.pre_and_primary_enrollment.total}
              </Text>
            </div>
            <div>
              <TextMuted className="text-center mb-4 p-2 border-b-2 font-weight-800 border-primary text-lg">
                Junior secondary
              </TextMuted>
              <div className="grid grid-cols-2 gap-2">
                <Inline title="Male" text={stat.junior_sec_enrollment.male} />
                <Inline
                  title="Female"
                  text={stat.junior_sec_enrollment.female}
                />
              </div>
              <TextMuted className="text-center font-bold">Total</TextMuted>
              <Text className="text-green-500 font-weight-800 text-center">
                {stat.junior_sec_enrollment.total}
              </Text>
            </div>
            <div>
              <TextMuted className="text-center mb-4 p-2 border-b-2 font-weight-800 border-primary text-lg">
                Senoir secondary
              </TextMuted>
              <div className="grid grid-cols-2 gap-2">
                <Inline title="Male" text={stat.senior_sec_enrollment.male} />
                <Inline
                  title="Female"
                  text={stat.senior_sec_enrollment.female}
                />
              </div>
              <TextMuted className="text-center font-bold">Total</TextMuted>
              <Text className="text-green-500 font-weight-800 text-center">
                {stat.senior_sec_enrollment.total}
              </Text>
            </div>
            <div>
              <TextMuted className="text-center mb-4 p-2 border-b-2 font-weight-800 border-primary text-lg">
                Private education
              </TextMuted>
              <div className="grid grid-cols-2 gap-2">
                <Inline
                  title="Male"
                  text={stat.private_education_enrollment.male}
                />
                <Inline
                  title="Female"
                  text={stat.private_education_enrollment.female}
                />
              </div>
              <TextMuted className="text-center font-bold">Total</TextMuted>
              <Text className="text-green-500 font-weight-800 text-center">
                {stat.private_education_enrollment.total}
              </Text>
            </div>
            <div>
              <TextMuted className="text-center mb-4 p-2 border-b-2 font-weight-800 border-primary text-lg">
                Science & vocational
              </TextMuted>
              <div className="grid grid-cols-2 gap-2">
                <Inline
                  title="Male"
                  text={stat.sci_and_vocational_enrollment.male}
                />
                <Inline
                  title="Female"
                  text={stat.sci_and_vocational_enrollment.female}
                />
              </div>
              <TextMuted className="text-center font-bold">Total</TextMuted>
              <Text className="text-green-500 font-weight-800 text-center">
                {stat.sci_and_vocational_enrollment.total}
              </Text>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

const Inline: React.FC<{ title: string; text: string | number }> = ({
  title,
  text,
}) => {
  return (
    <div className="w-full">
      <TextMuted className="text-center">{title}&nbsp;</TextMuted>
      <Text className="text-green-500 font-weight-500 text-center">{text}</Text>
    </div>
  );
};

export default SchoolsStat;
