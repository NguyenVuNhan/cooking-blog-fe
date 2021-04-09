import TextField, { TextFieldProps } from "@material-ui/core/TextField";
import React, { FC } from "react";
import Autocomplete from "@material-ui/lab/Autocomplete";
import CircularProgress from "@material-ui/core/CircularProgress";
import { getIngredients } from "services/ingredient";
import { extractMatch } from "helpers/autoComplete";
import { throttle } from "helpers/utils";
import { UseFormMethods } from "react-hook-form";
import { Controller } from "react-hook-form";

type Props = Pick<UseFormMethods, "control"> &
  TextFieldProps & {
    name: string;
  };

const IngredientInput: FC<Props> = ({
  control,
  name,
  defaultValue,
  ...rest
}) => {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState<string[]>([]);
  let loading = false;

  const fetch = React.useMemo(
    () =>
      throttle((name: string) => {
        loading = true;
        if (name.length > 0)
          getIngredients(name).then((res) => {
            setOptions(res.data.ingredients);
            loading = false;
          });
      }, 2000),
    []
  );

  const onInputChange = (
    _event: React.ChangeEvent<Record<string, unknown>>,
    value: string
  ): void => {
    if (value === "") {
      setOptions([]);
      return;
    }

    fetch(value);
  };

  return (
    <Controller
      render={(props) => (
        <Autocomplete
          {...props}
          options={options}
          getOptionLabel={(option) => option}
          renderOption={(option, { inputValue }) => {
            return (
              <div>
                {extractMatch(option, inputValue, (element, match, i) => (
                  <span key={i} style={{ fontWeight: match ? 700 : 400 }}>
                    {element}
                  </span>
                ))}
              </div>
            );
          }}
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          onInputChange={onInputChange}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              {...rest}
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <React.Fragment>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </React.Fragment>
                ),
              }}
            />
          )}
          onChange={(_, data) => props.onChange(data)}
          freeSolo
        />
      )}
      name={name}
      control={control}
      defaultValue={defaultValue}
    />
  );
};

IngredientInput.displayName = "IngredientInput";

export default IngredientInput;
