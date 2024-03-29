package org.itech.locator.form.webapp.security;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.web.AuthenticationEntryPoint;
import org.springframework.security.web.authentication.AnonymousAuthenticationFilter;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.security.web.util.matcher.AntPathRequestMatcher;
import org.springframework.security.web.util.matcher.OrRequestMatcher;
import org.springframework.security.web.util.matcher.RequestMatcher;

@Configuration
@EnableWebSecurity
public class WebSecurityConfig extends WebSecurityConfigurerAdapter {

	private static final RequestMatcher PROTECTED_URLS = new OrRequestMatcher(
			new AntPathRequestMatcher("/summary/**"));
	private static final RequestMatcher OPEN_URLS = new OrRequestMatcher(
			new AntPathRequestMatcher("/locator-form/**"), new AntPathRequestMatcher("/resident/**"));

	private AuthenticationProvider provider;

	public WebSecurityConfig(final AuthenticationProvider authenticationProvider) {
		super();
		this.provider = authenticationProvider;
	}

	@Override
	protected void configure(final AuthenticationManagerBuilder auth) {
		auth.authenticationProvider(provider);
	}

	@Override
	public void configure(HttpSecurity http) throws Exception {
		http
			.cors() //
				.and() //
			.sessionManagement() //
				.sessionCreationPolicy(SessionCreationPolicy.STATELESS) //
				.and() //
			.exceptionHandling() //
				.and() //
			.authenticationProvider(provider)
			.addFilterBefore(authenticationFilter(), AnonymousAuthenticationFilter.class) //
			.authorizeRequests() //
				.requestMatchers(PROTECTED_URLS) //
					.authenticated() //
				.requestMatchers(OPEN_URLS)//
					.permitAll()
				.and() //
			.csrf() //
				.disable() //
			.formLogin() //
				.disable() //
			.httpBasic() //
				.disable() //
			.logout() //
				.disable();
	}

	@Bean
	AuthenticationFilter authenticationFilter() throws Exception {
		final AuthenticationFilter filter = new AuthenticationFilter(PROTECTED_URLS);
		filter.setAuthenticationManager(authenticationManager());
		// filter.setAuthenticationSuccessHandler(successHandler());
		return filter;
	}

	@Bean
	AuthenticationEntryPoint forbiddenEntryPoint() {
		return new HttpStatusEntryPoint(HttpStatus.FORBIDDEN);
	}

}