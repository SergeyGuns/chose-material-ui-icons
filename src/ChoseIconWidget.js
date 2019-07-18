import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import * as icons from "@material-ui/icons";
import Chip from "@material-ui/core/Chip";
import { TextField, InputAdornment } from "@material-ui/core";
import Radio from "@material-ui/core/Radio";
import RadioGroup from "@material-ui/core/RadioGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import FormControl from "@material-ui/core/FormControl";
import FormLabel from "@material-ui/core/FormLabel";
import IconFilterList from "@material-ui/icons/FilterList";

const useStyles = makeStyles(theme => ({
  chip: {
    margin: theme.spacing(0.5)
  },
  oot: {
    display: "flex"
  },
  formControl: {
    margin: theme.spacing(3)
  },
  group: {
    margin: theme.spacing(1, 0)
  }
}));

export default () => {
  const classes = useStyles();
  const [filterValue, setFilter] = React.useState("");
  const [radioValueIconsType, setIconsTypeValue] = React.useState("Normal");
  const [radioValueModulesType, setModuleTypeValue] = React.useState("import");
  const [chosedIcons, setChosedIcons] = React.useState([]);
  const [copyTemplateValue, setCopyTemplateValue] = React.useState("");

  React.useEffect(() => {
    retempateCopyValue();
  });

  const templateCopyString = keys =>
    keys
      .map(key =>
        radioValueModulesType === "import"
          ? `import Icon${key} from '@material-ui/icons/${key}'`
          : `const Icon${key} require('@material-ui/icons/${key}')`
      )
      .join("\n");

  const handleInputChange = event => {
    setFilter(event.target.value);
  };
  const handleIconsClick = key => () => {
    setChosedIcons(chosedIcons.concat([key]));
    setCopyTemplateValue(templateCopyString(chosedIcons.concat([key])));
  };

  const retempateCopyValue = () =>
    setCopyTemplateValue(templateCopyString(chosedIcons));

  const handleChangeIconsType = event => {
    setIconsTypeValue(event.target.value);
  };

  const handleChangeModulesType = event => {
    setModuleTypeValue(event.target.value);
  };

  const handleDeleteChosedIcons = key => () => {
    const newChosedIcons = [...chosedIcons];
    let indexInChosed = -1;
    newChosedIcons.forEach((chosedKey, index) => {
      if (key === chosedKey) indexInChosed = index;
    });
    newChosedIcons.splice(indexInChosed, 1);
    setChosedIcons(newChosedIcons);
  };

  return (
    <>
      <div>
        <TextField
          className={classes.copyField}
          fullWidth={true}
          multiline={true}
          value={copyTemplateValue}
        />
      </div>
      <div>
        {chosedIcons.map(key => {
          const Icon = icons[key];
          return (
            <Chip
              size="large"
              className={classes.chip}
              key={key}
              icon={<Icon />}
              label={""}
              onClick={handleIconsClick(key)}
              onDelete={handleDeleteChosedIcons(key)}
            />
          );
        })}
      </div>
      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Icons Type</FormLabel>
        <RadioGroup
          aria-label="Icons Type"
          name="iconsTypes"
          className={classes.group}
          value={radioValueIconsType}
          onChange={handleChangeIconsType}
        >
          {["Normal", "Rounded", "Outline", "TwoTone", "Sharp"].map(
            iconType => (
              <FormControlLabel
                value={iconType}
                control={<Radio />}
                label={iconType}
              />
            )
          )}
        </RadioGroup>
      </FormControl>

      <FormControl component="fieldset" className={classes.formControl}>
        <FormLabel component="legend">Modules type</FormLabel>
        <RadioGroup
          aria-label="Modules type"
          name="moduleTypes"
          className={classes.group}
          value={radioValueModulesType}
          onChange={handleChangeModulesType}
        >
          {["import", "require"].map(typeModules => (
            <FormControlLabel
              value={typeModules}
              control={<Radio />}
              label={typeModules}
            />
          ))}
        </RadioGroup>
      </FormControl>
      <div>
        <TextField
          onChange={handleInputChange}
          value={filterValue}
          placeholder="filter"
          variant="outlined"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconFilterList />
              </InputAdornment>
            )
          }}
        />
      </div>
      {Object.keys(icons)
        .filter(filterChosed(chosedIcons))
        .filter(
          radioValueIconsType === "Normal"
            ? normalFilter
            : filterTyped(radioValueIconsType)
        )
        .filter(
          key => key.toUpperCase().indexOf(filterValue.toUpperCase()) > -1
        )
        .map(key => {
          const Icon = icons[key];
          const Label = <>{key}</>;
          return (
            <Chip
              size="large"
              className={classes.chip}
              key={key}
              icon={<Icon />}
              label={Label}
              onClick={handleIconsClick(key)}
            />
          );
        })}
    </>
  );
};

function normalFilter(key) {
  return (
    key.indexOf("Rounded") === -1 &&
    key.indexOf("Outlined") === -1 &&
    key.indexOf("Outline") === -1 &&
    key.indexOf("TwoTone") === -1 &&
    key.indexOf("Sharp") === -1
  );
}

function filterChosed(chosedIcons) {
  return iconsKeys => chosedIcons.indexOf(iconsKeys) === -1;
}

function filterTyped(value) {
  return key => key.toUpperCase().indexOf(value.toUpperCase()) !== -1;
}
