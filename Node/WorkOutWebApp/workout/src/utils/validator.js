import React from "react";

export const validateUsername = (username) => {
  // username must be unique, string with max 255 chars
  // call db function to check if username already exists
  if (
    typeof username === "string" &&
    username.trim() != "" &&
    username.length < 256
  ) {
    return true;
  } else {
    return false;
  }
};

export const validatePassword = (password) => {
  // password must be a string with max 255 chars, 1 uppercase, 1 lowercase, 1 number
  if (
    typeof password === "string" &&
    password.trim() != "" &&
    password.length < 256 &&
    /[a-z]/.test(password) &&
    /[A-Z]/.test(password) &&
    /[0-9]/.test(password)
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateFirstName = (firstName) => {
  // must be string, max of 255 chars
  if (
    typeof firstName === "string" &&
    firstName.trim() != "" &&
    firstName.length < 256
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateLastName = (lastName) => {
  // must be string, max of 255 chars
  if (
    typeof lastName === "string" &&
    lastName.trim() != "" &&
    lastName.length < 256
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateHeightFt = (heightFt) => {
  // must be an integer between 1 and 8
  if (typeof heightFt === "int" && heightFt > 0 && heightFt < 9) {
    return true;
  } else {
    return false;
  }
};

export const validateHeightIn = (heightIn) => {
  // must be an integer between 0 and 11
  if (heightIn.isInteger() && heightIn >= 0 && heightIn < 12) {
    return true;
  } else {
    return false;
  }
};

export const validateWeight = (weight) => {
  // must be a float or int between 0 and 1500
  if (
    typeof weight === "number" &&
    isFinite(weight) &&
    weight >= 0 &&
    weight < 1500
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateAge = (age) => {
  // must be an int between 15 and 130
  if (age.isInteger() && age >= 15 && age <= 130) {
    return true;
  } else {
    return false;
  }
};
