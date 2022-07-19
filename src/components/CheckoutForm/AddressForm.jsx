import React from "react";
import {
  InputLabel,
  Select,
  MenuItem,
  Button,
  Grid,
  Typography,
  Box,
} from "@material-ui/core";
import { useForm, FormProvider } from "react-hook-form";
import { Link } from "react-router-dom";
import { commerce } from "../../api/Commerce";
import FormInput from "./FormInput";

const AddressForm = ({ token, next }) => {
  const methods = useForm();

  const [shippingCountries, setShippingCountries] = React.useState([]);
  const [shippingCountry, setShippingCountry] = React.useState("");

  const [shippingSubDivisions, setShippingSubDivisions] = React.useState([]);
  const [shippingSubDivision, setShippingSubDivision] = React.useState("");

  const [shippingOptions, setShippingOptions] = React.useState([]);
  const [shippingOption, setShippingOption] = React.useState("");

  const fetchShippingCountries = async (checkoutTokenId) => {
    const { countries } = await commerce.services.localeListShippingCountries(
      checkoutTokenId
    );
    setShippingCountries(countries);
    setShippingCountry(Object.keys(countries)[0]);
  };

  const fetchShippingSubDivision = async (countryCode) => {
    const { subdivisions } = await commerce.services.localeListSubdivisions(
      countryCode
    );
    setShippingSubDivisions(subdivisions);
    setShippingSubDivision(Object.keys(subdivisions)[0]);
  };

  const fetchShippingOptions = async (
    checkoutTokenId,
    country,
    region = null
  ) => {
    const options = await commerce.checkout.getShippingOptions(
      checkoutTokenId,
      { country, region }
    );

    setShippingOptions(options);
    setShippingOption(options[0].id);
  };

  React.useEffect(() => {
    fetchShippingCountries(token?.id);
  }, []);

  React.useEffect(() => {
    if (shippingCountry) fetchShippingSubDivision(shippingCountry);
  }, [shippingCountry]);

  React.useEffect(() => {
    if (shippingSubDivision)
      fetchShippingOptions(token?.id, shippingCountry, shippingSubDivision);
  }, [shippingSubDivision]);

  return (
    <>
      <Typography variant={"h6"} gutterBottom>
        Shipping Address
      </Typography>
      <FormProvider {...methods}>
        <form
          onSubmit={methods.handleSubmit((data) =>
            next({
              ...data,
              shippingCountry,
              shippingOption,
              shippingSubDivision,
            })
          )}
        >
          <Grid container spacing={3}>
            <FormInput label="First name" name="firstName" required />
            <FormInput label="Last name" name="lastName" required />
            <FormInput label="Address" name="address" required />
            <FormInput label="e-mail" name="e-mail" required />
            <FormInput label="City" name="city" required />
            <FormInput label="Pin Code" name="pin code" required />
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Country</InputLabel>
              <Select
                value={shippingCountry}
                fullWidth
                onChange={(e) => setShippingCountry(e.target.value)}
              >
                {Object.entries(shippingCountries)
                  .map(([key, value]) => ({ id: key, label: value }))
                  .map((country) => (
                    <MenuItem key={country?.id} value={country.id}>
                      {country?.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Subdivision</InputLabel>
              <Select
                value={shippingSubDivision}
                fullWidth
                onChange={(e) => setShippingSubDivision(e.target.value)}
              >
                {Object.entries(shippingSubDivisions)
                  .map(([key, value]) => ({ id: key, label: value }))
                  .map((subdivision) => (
                    <MenuItem key={subdivision?.id} value={subdivision.id}>
                      {subdivision?.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <Grid item xs={12} sm={6}>
              <InputLabel>Shipping Options</InputLabel>
              <Select
                value={shippingOption}
                fullWidth
                onChange={(e) => setShippingOption(e.target.value)}
              >
                {shippingOptions
                  .map((option) => ({
                    id: option?.id,
                    label: `${option?.description} - (${option?.price?.formatted_with_symbol})`,
                  }))
                  .map((item) => (
                    <MenuItem key={item?.id} value={item.id}>
                      {item?.label}
                    </MenuItem>
                  ))}
              </Select>
            </Grid>
            <br />
            <Box display="flex" alignItems="center">
              <Button
                component={Link}
                variant="outlined"
                to="/cart"
                style={{ margin: 20 }}
              >
                Back to Cart
              </Button>
              <Button type="submit" variant="contained" color="primary">
                Next
              </Button>
            </Box>
          </Grid>
        </form>
      </FormProvider>
    </>
  );
};

export default AddressForm;
