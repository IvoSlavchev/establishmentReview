package org.elsysbg.ip.review.rest;

import java.util.List;

import javax.inject.Inject;
import javax.ws.rs.Consumes;
import javax.ws.rs.GET;
import javax.ws.rs.POST;
import javax.ws.rs.Path;
import javax.ws.rs.PathParam;
import javax.ws.rs.Produces;
import javax.ws.rs.core.MediaType;

import org.elsysbg.ip.review.entities.Establishment;
import org.elsysbg.ip.review.services.EstablishmentsService;

@Path("/establishments")
public class EstablishmentsRest {
	private final EstablishmentsService establishmentsService;

	@Inject
	public EstablishmentsRest(EstablishmentsService establishmentsService) {
		this.establishmentsService = establishmentsService;
	}
	
	@POST
	@Path("/signup")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Establishment createEstablishment(Establishment establishment) {
		return establishmentsService.createEstablishment(establishment);
	}
	
	@POST
	@Path("/login")
	@Consumes({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public void loginEstablishment(Establishment establishment) {
		establishmentsService.loginEstablishment(establishment);
	}
	
	@GET
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public List<Establishment> getEstablishments() {
		return establishmentsService.getEstablishments();
	}
	
	@GET
	@Path("/{establishmentId}")
	@Produces({MediaType.APPLICATION_JSON, MediaType.APPLICATION_XML})
	public Establishment getEstablishment(@PathParam("establishmentId") long establishmentId) {
		return establishmentsService.getEstablishment(establishmentId);
	}
}