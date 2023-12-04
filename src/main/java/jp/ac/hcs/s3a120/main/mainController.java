package jp.ac.hcs.s3a120.main;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class mainController {
	@GetMapping("/")
	public String index() {
		return "index";
	}

	@PostMapping("/play")
	public String play() {
		return "play";
	}
}
