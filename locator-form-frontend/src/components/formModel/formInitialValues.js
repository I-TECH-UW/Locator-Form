export default {
  travellerType: '',

  patientId: '', serviceRequestId: '', taskId: '', testKitId: '',
  airlineName: '', flightNumber: '', seatNumber: '',
  title: '',firstName: '', lastName: '', middleInitial: '', 
  acceptedTerms: false,
  tempAddrCheckbox:false,
  visitPurpose: '', arrivalDate: '',
  mobilePhone: '', fixedPhone: '', businessPhone: '',
  email: '', confirmEmail: '',
  sex: '', dateOfBirth: '', nationalId: '', profession: '',
  passportNumber: '', countryOfPassportIssue: '', countryOfBirth: '', portOfEmbarkation: '', lengthOfStay: '', countriesVisited: [],
  hadCovidBefore: '', fever: 'true', soreThroat: '', jointPain: '', cough: '', breathingDifficulties: '', rash: '',
  firstVaccineName: '', dateOfFirstDose: '', secondVaccineName: '', dateOfSecondDose: '',

  permanentAddress:
  {
    travellerType: '',
    numberAndStreet: '',
    apartmentNumber: '',
    city: '',
    stateProvince: '',
    country: '',
    zipPostalCode: '',
  },

  temporaryAddress:
  {
    hotelName: '',
    numberAndStreet: '',
    apartmentNumber: '',
    country: 'MU',
    city: '',
    stateProvince: '',
  },


  emergencyContact:
  {
    lastName: '',
    firstName: '',
    address: '',
    country: '',
    email: '',
    mobilePhone: '',
  },

  familyTravelCompanions: [
    // {
    //   serviceRequestId: "",
    //   patientId: "",
    //   lastName: "",
    //   firstName: "",
    //   middleInitial: "",
    //   seatNumber: "",
    //   dateOfBirth: "",
    //   sex: "",
    //   nationality: "",
    //   passportNumber: "",
    // }
  ],
  nonFamilyTravelCompanions: [
    // {
    //   serviceRequestId: "",
    //   patientId: "",
    //   lastName: "",
    //   firstName: "",
    //   middleInitial: "",
    //   seatNumber: "",
    //   dateOfBirth: "",
    //   sex: "",
    //   nationality: "",
    //   passportNumber: "",
    // }
  ]
};