package ai.yuvi.rest;

import ai.yuvi.dao.CompanyDao;
import ai.yuvi.model.Company;
import ai.yuvi.config.DataSourceProvider;

import javax.ws.rs.*;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Optional;
import java.util.logging.Level;
import java.util.logging.Logger;
import java.util.HashMap;
import java.util.Map;

@Path("/companies")
@Produces(MediaType.APPLICATION_JSON)
@Consumes(MediaType.APPLICATION_JSON)
public class CompanyResource {
    private static final Logger LOGGER = Logger.getLogger(CompanyResource.class.getName());
    private final CompanyDao companyDao;

    public CompanyResource() {
        this.companyDao = new CompanyDao(DataSourceProvider.getDataSource());
    }

    @GET
    public Response getAllCompanies() {
        try {
            List<Company> companies = companyDao.findAll();
            return Response.ok(companies).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error getting all companies", e);
            return Response.serverError()
                .entity(new ErrorResponse("Error fetching companies", e.getMessage()))
                .build();
        }
    }

    @GET
    @Path("/{id}")
    public Response getCompany(@PathParam("id") Long id) {
        try {
            Optional<Company> company = companyDao.findById(id);
            return company
                .map(c -> Response.ok(c).build())
                .orElse(Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse("Company not found", "No company found with ID: " + id))
                    .build());
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error getting company with ID: " + id, e);
            return Response.serverError()
                .entity(new ErrorResponse("Error fetching company", e.getMessage()))
                .build();
        }
    }

    @POST
    public Response createCompany(Company company) {
        try {
            if (company == null) {
                return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse("Invalid request", "Company data is required"))
                    .build();
            }

            boolean created = companyDao.create(company);
            if (created) {
                return Response.status(Response.Status.CREATED).entity(company).build();
            } else {
                return Response.serverError()
                    .entity(new ErrorResponse("Creation failed", "Failed to create company"))
                    .build();
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error creating company", e);
            return Response.serverError()
                .entity(new ErrorResponse("Error creating company", e.getMessage()))
                .build();
        }
    }

    @PUT
    @Path("/{id}")
    public Response updateCompany(@PathParam("id") Long id, Company company) {
        try {
            if (company == null) {
                return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse("Invalid request", "Company data is required"))
                    .build();
            }

            if (!id.equals(company.getCompanyId())) {
                return Response.status(Response.Status.BAD_REQUEST)
                    .entity(new ErrorResponse("Invalid request", "ID in path does not match ID in body"))
                    .build();
            }

            boolean updated = companyDao.update(company);
            if (updated) {
                return Response.ok(company).build();
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse("Update failed", "Company not found with ID: " + id))
                    .build();
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error updating company with ID: " + id, e);
            return Response.serverError()
                .entity(new ErrorResponse("Error updating company", e.getMessage()))
                .build();
        }
    }

    @DELETE
    @Path("/{id}")
    public Response deleteCompany(@PathParam("id") Long id) {
        try {
            boolean deleted = companyDao.delete(id);
            if (deleted) {
                return Response.noContent().build();
            } else {
                return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse("Delete failed", "Company not found with ID: " + id))
                    .build();
            }
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error deleting company with ID: " + id, e);
            return Response.serverError()
                .entity(new ErrorResponse("Error deleting company", e.getMessage()))
                .build();
        }
    }

    @GET
    @Path("/{id}/details")
    public Response getCompanyDetails(@PathParam("id") Long id) {
        try {
            Optional<Company> companyOpt = companyDao.findById(id);
            if (!companyOpt.isPresent()) {
                return Response.status(Response.Status.NOT_FOUND)
                    .entity(new ErrorResponse("Company not found", "No company found with ID: " + id))
                    .build();
            }

            Map<String, Object> details = new HashMap<>();
            details.put("company", companyOpt.get());
            
            // Get related data
            details.put("products", companyDao.getCompanyProducts(id));
            //details.put("team", companyDao.getCompanyTeam(id));
            details.put("research", companyDao.getCompanyResearch(id));
            details.put("competitors", companyDao.getCompanyCompetitors(id));
            details.put("users", companyDao.getCompanyUsers(id));
            details.put("brand", companyDao.getCompanyBrand(id));
            details.put("uiArchetypes", companyDao.getCompanyUIArchetypes(id));
            
            return Response.ok(details).build();
        } catch (Exception e) {
            LOGGER.log(Level.SEVERE, "Error getting company details for ID: " + id, e);
            return Response.serverError()
                .entity(new ErrorResponse("Error fetching company details", e.getMessage()))
                .build();
        }
    }

    private static class ErrorResponse {
        private final String error;
        private final String message;

        public ErrorResponse(String error, String message) {
            this.error = error;
            this.message = message;
        }

        public String getError() { return error; }
        public String getMessage() { return message; }
    }
} 