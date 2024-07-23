import React, { HTMLProps, useEffect, useState } from "react";
import { Text, TextBolded } from "../components/Text";
import Container from "../components/Container";
import Loader from "../components/Loader";
import { Link, useNavigate } from "react-router-dom";
import { useTimer } from "../utils/utils";
import { useCreateApiForm, useLoadTemplateList } from "../utils/apicalls/forms";

type TemplateType = {
  formId: string;
  templateName: string;
};

const FormTemplates: React.FC = () => {
  const [showProgress, setShowProgress] = useState(false);
  const [formId, setFormId] = useState("");
  const navigate = useNavigate();
  const [startTimer, setStartTimer] = useState(false);
  const [responseData, setResponseData] = useState<any>("");
  const [templates, setTemplates] = useState<TemplateType[]>([]);
  const createApiForm = useCreateApiForm();
  const loadTemplatesList = useLoadTemplateList();

  const onTimeout = () => {
    createApiForm(setFormId);
  };

  useEffect(() => {
    if (!responseData) {
      loadTemplatesList(setResponseData);
    } else {
      const tmps = responseData.templates;
      const p: TemplateType[] = [];

      for (let i = 0; i < tmps.length; i++) {
        p.push({
          formId: tmps[i].form_id,
          templateName: tmps[i].template_name,
        });
      }
      setTemplates(p);
    }
  }, [responseData]);

  useEffect(() => {
    if (showProgress) {
      createApiForm(setFormId);
      setStartTimer(true);
    }
  }, [showProgress]);

  useEffect(() => {
    if (formId != "") {
      navigate(`/forms/edit?form_id=${formId}`);
    }
  }, [formId]);
  const handleCreateForm = () => {
    setShowProgress(true);
  };

  return (
    <>
      {showProgress && (
        <Loader
          text="Creating template in progress..."
          timeout={10}
          startTimer={startTimer}
          onTimeout={onTimeout}
        />
      )}
      <div className="p-2">
        <div className="w-full p-8 bg-secondary rounded-b-3xl shadow-xl">
          <TextBolded className="text-xl text-white text-center">
            Form templates
          </TextBolded>
        </div>

        <Container className="">
          <div
            className="inline-block p-2 mr-4 cursor-pointer bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] h-[220px] w-[200px] justify-center items-center"
            onClick={handleCreateForm}
          >
            <i className="fa fa-file text-[100px] w-full text-center"></i>
            <Text className="text-xl pt-3 w-full text-center">
              Blank template
            </Text>
          </div>
          {templates.map((template, key) => (
            <Template
              name={template.templateName}
              formId={template.formId}
              key={key}
            />
          ))}
        </Container>
      </div>
    </>
  );
};

interface Props extends HTMLProps<HTMLDivElement> {
  name: string;
  formId: string;
}
const Template: React.FC<Props> = ({ name, formId, ...props }) => {
  return (
    <div
      className="inline-block p-2 mr-4 mt-4 cursor-pointer bg-[rgba(0,0,0,0.1)] hover:bg-[rgba(0,0,0,0.2)] h-[220px] w-[200px] justify-center items-center"
      {...props}
    >
      <Link to={`/forms/edit?form_id=${formId}`}>
        <i className="fa fa-file text-[100px] w-full text-center"></i>
        <Text className="text-xl pt-3 w-full text-center">{name}</Text>
      </Link>
    </div>
  );
};
export default FormTemplates;
