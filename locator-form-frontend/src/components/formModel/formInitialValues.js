export default {
  travellerType: '',


  serviceRequestId: "",
  airlineName: '', flightNumber: '', seatNumber: '',
  title: '',firstName: '', lastName: '', middleInitial: '', 
  acceptedTerms: false,
  tempAddrCheckbox:false,
  visitPurpose: '', arrivalDate: '',
  mobilePhone: '', fixedPhone: '',
  email: '', confirmEmail: '',
  sex: '', dateOfBirth: '', nationalId: '',
  passportNumber: '', nationality: '', portOfEmbarkation: '', lengthOfStay: '', countriesVisited: [],
  hadCovidBefore: '', fever: '', soreThroat: '', jointPain: '', cough: '', breathingDifficulties: '', rash: '',

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