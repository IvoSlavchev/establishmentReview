package org.elsysbg.ip.review;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.Properties;

import org.apache.openjpa.jdbc.schema.SimpleDriverDataSource;
import org.elsysbg.ip.review.services.EntityManagerService;

public class ReviewDataSource extends SimpleDriverDataSource {
	
	@Override
	protected Connection getSimpleConnection(Properties props) throws SQLException {
		final EntityManagerService entityManagerService =
				ReviewServletContextListener.injector.getInstance(EntityManagerService.class);
		return entityManagerService.createEntityManager().unwrap(Connection.class);
	}
}