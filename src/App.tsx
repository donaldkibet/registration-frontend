import React from "react";
import { Header, HeaderName } from "@carbon/react";
import "./App.scss";
import RegistrationForm from "./components/registration-form.component";

const App: React.FC = () => {
  return (
    <main className="main">
      <Header aria-label="Form Registration">
        <HeaderName href="#" prefix="Form">
          [Registration-App]
        </HeaderName>
      </Header>
      <div className="content">
        <RegistrationForm />
      </div>
    </main>
  );
};
export default App;
