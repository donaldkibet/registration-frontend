import React, { useMemo, useState } from "react";
import {
  Form,
  Stack,
  TextInput,
  DatePicker,
  FormGroup,
  RadioButtonGroup,
  Button,
  DatePickerInput,
  RadioButton,
  Dropdown,
} from "@carbon/react";
import { useCounties } from "../hooks/useCounties";
import { DropdownSelectedItem } from "../types";
import { useSubCounties } from "../hooks/useSubCounty";
import { useWardsByCountyAndSubCountyID } from "../hooks/useWards";

const RegistrationForm: React.FC = () => {
  const [selectedCountyId, setSelectedCountyId] = useState<string>("");
  const [selectedSubCountyId, setSelectedSubCountyId] = useState<string>("");
  const { counties } = useCounties();
  const { subCounties } = useSubCounties(selectedCountyId);
  const { wards } = useWardsByCountyAndSubCountyID(
    selectedCountyId,
    selectedSubCountyId
  );

  return (
    <>
      <Form onSubmit={(event: React.ChangeEvent) => event.preventDefault()}>
        <Stack gap={7}>
          <TextInput
            helperText="Enter full name as appearing in official documents"
            id="name"
            invalidText="Invalid error message."
            labelText="Name"
            placeholder="Placeholder name"
          />
          <DatePicker
            maxDate={new Date().toISOString()}
            dateFormat="m/d/Y"
            datePickerType="single"
          >
            <DatePickerInput
              id="date-picker-calendar-id"
              placeholder="mm/dd/yyyy"
              labelText="Date of birth"
              type="text"
            />
          </DatePicker>

          <FormGroup legendText="Gender">
            <RadioButtonGroup
              defaultSelected="default-selected"
              legend="Group Legend"
              name="gender-radio"
              valueSelected="default-selected"
              orientation="vertical"
              labelPosition="right"
            >
              <RadioButton id="radio-1" labelText="Male" value="male" />
              <RadioButton id="radio-2" labelText="Female" value="female" />
              <RadioButton id="radio-3" labelText="Unknown" value="unknown" />
            </RadioButtonGroup>
          </FormGroup>

          <FormGroup legendText="Address">
            <Dropdown
              ariaLabel="county dropdown"
              id="county"
              items={counties}
              label="Select county"
              titleText="County"
              onChange={(item: DropdownSelectedItem) => {
                setSelectedCountyId(item.selectedItem.id);
                setSelectedSubCountyId("");
              }}
            />

            <Dropdown
              disabled={!(subCounties.length > 0)}
              ariaLabel="sub county dropdown"
              id="subcounty"
              items={subCounties}
              label="Select sub county"
              titleText="Sub County"
              onChange={(item: DropdownSelectedItem) =>
                setSelectedSubCountyId(item.selectedItem.id)
              }
            />
            <Dropdown
              disabled={!(wards.length > 0)}
              ariaLabel="wards dropdown"
              id="ward"
              items={wards}
              label="Select ward"
              titleText="Ward"
            />
          </FormGroup>

          <Button kind="primary" tabIndex={0} type="submit">
            Submit
          </Button>
        </Stack>
      </Form>
    </>
  );
};

export default RegistrationForm;
