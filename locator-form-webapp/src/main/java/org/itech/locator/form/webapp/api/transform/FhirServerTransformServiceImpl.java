package org.itech.locator.form.webapp.api.transform;

import org.springframework.stereotype.Service;

@Service
public class FhirServerTransformServiceImpl implements FhirServerTransformService {


	public FhirServerTransformServiceImpl() {
	}

//	@Override
//	public Iterable<FhirServerDTO> getAsDTO(Iterable<FhirServer> fhirServers) {
//		List<FhirServerDTO> fhirServerDTOs = new ArrayList<>();
//		for (FhirServer fhirServer : fhirServers) {
//			fhirServerDTOs.add(getAsDTO(fhirServer));
//		}
//		return fhirServerDTOs;
//	}

//	@Override
//	@Transactional(readOnly = true)
//	public FhirServerDTO getAsDTO(FhirServer fhirServer) {
//
//	    // test comment 
//		FhirServerDTO fhirServerDTO = new FhirServerDTO();
//		fhirServerDTO.setId(fhirServer.getId());
//		fhirServerDTO.setName(fhirServer.getName());
//		fhirServerDTO.setUri(fhirServer.getUri());
//		fhirServerDTO.setCode(fhirServer.getCode());
//		fhirServerDTO.setLastCheckedIn(fhirServer.getLastCheckedIn());
//		fhirServerDTO.setRegistered(fhirServer.getRegistered());
//
//		return fhirServerDTO;
//	}

}
