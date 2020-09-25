export default {
  travellerType: '',
  airlineName: '', flightNumber: '', seatNumber: '',
  title: '',firstName: '', lastName: '', middleInitial: '', 
  acceptedTerms: false,
  tempAddrCheckbox:false,
  visitPurpose: '', arrivalDate: '',
  mobilePhone: '', businessPhone: '',
  email: '', confirmEmail: '',
  sex: '', dateOfBirth: '', nationalId: '',
  passportNumber: '', nationality: '', portOfEmbarkation: '', lengthOfStay: '', countriesVisited: [],
  fever: '', soreThroat: '', jointPain: '', cough: '', breathingDifficulties: '', rash: '',

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
    country: 'Mauritius',
    city: '',
    stateProvince: '',
  },


  emergencyContact:
  {
    lastName: '',
    firstName: '',
    city: '',
    country: '',
    email: '',
    mobilePhone: '',
  },

  familyTravelCompanions: [
    // {
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