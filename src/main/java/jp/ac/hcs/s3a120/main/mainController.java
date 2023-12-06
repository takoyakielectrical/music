package jp.ac.hcs.s3a120.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class mainController {
	@GetMapping("/")
	public String index() {
		return "index";
	}

	@GetMapping("/play")
	public String play() {
		return "play";
	}
}
