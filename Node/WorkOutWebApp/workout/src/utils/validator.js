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
  if (heightFt.trim() === "") {
    return false;
  }
  heightFt = Number(heightFt);
  if (
    isFinite(heightFt) &&
    Number.isInteger(heightFt) &&
    typeof heightFt === "number" &&
    heightFt > 0 &&
    heightFt < 9
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateHeightIn = (heightIn) => {
  // must be an integer between 0 and 11
  if (heightIn.trim() === "") {
    return false;
  }
  heightIn = Number(heightIn);
  if (
    isFinite(heightIn) &&
    Number.isInteger(heightIn) &&
    typeof heightIn === "number" &&
    heightIn >= 0 &&
    heightIn < 12
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateWeight = (weight) => {
  // must be a float or int between 0 and 1500
  if (weight.trim() === "") {
    return false;
  }
  weight = Number(weight);
  if (
    isFinite(weight) &&
    typeof weight === "number" &&
    weight >= 0 &&
    weight < 1500
  ) {
    //alert(Number.isInteger(weight) === true);
    return true;
  } else {
    return false;
  }
};

export const validateAge = (age) => {
  // must be an int between 15 and 130
  if (age.trim() === "") {
    return false;
  }
  age = Number(age);
  if (
    isFinite(age) &&
    Number.isInteger(age) &&
    typeof age === "number" &&
    age >= 15 &&
    age <= 130
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateActivityLevel = (level) => {
  if (
    isFinite(level) &&
    typeof level === "number" &&
    (level === 0 || level === 1 || level === 2 || level === 3)
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateGender = (gender) => {
  if (
    isFinite(gender) &&
    typeof gender === "number" &&
    (gender === 0 || gender === 1)
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateCalories = (numCal) => {
  if (numCal.trim() === "") {
    return false;
  }
  numCal = Number(numCal);
  if (
    isFinite(numCal) &&
    Number.isInteger(numCal) &&
    typeof numCal === "number" &&
    numCal > 0 &&
    numCal <= 20000
  ) {
    return true;
  } else {
    return false;
  }
};

export const validateRepsSets = (num) => {
  if (num.trim() === "") {
    return true;
  }
  num = Number(num);
  if (
    isFinite(num) &&
    Number.isInteger(num) &&
    typeof num === "number" &&
    num >= 0 &&
    num <= 100000
  ) {
    return true;
  } else {
    return false;
  }
};
