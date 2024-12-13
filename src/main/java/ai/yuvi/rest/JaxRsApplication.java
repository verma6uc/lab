package ai.yuvi.rest;

import ai.yuvi.filter.CORSFilter;
import ai.yuvi.util.DbUtil;
import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import org.glassfish.jersey.server.ResourceConfig;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api")
public class JaxRsApplication extends ResourceConfig {

	public JaxRsApplication() {
		// Initialize database connection
		DbUtil.init();

		// Register resources
		register(AuthenticationResource.class);
		register(CompanyResource.class);

		// Register CORS filter
		register(CORSFilter.class);

		// Enable CORS
		property("jersey.config.server.cors.allowCredentials", "true");
		property("jersey.config.server.cors.allowedHeaders", "origin, content-type, accept, authorization");
		property("jersey.config.server.cors.allowedMethods", "GET, POST, PUT, DELETE, OPTIONS, HEAD");
		property("jersey.config.server.cors.allowedOrigins", "http://localhost:5175");
	}
}