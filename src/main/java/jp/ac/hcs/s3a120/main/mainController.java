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

	@GetMapping("/select")
	public String select() {
		return "select";
	}

	@GetMapping("/bpm60")
	public String bpm60() {
		return "bpm60";
	}

	@GetMapping("/bpm100")
	public String bpm100() {
		return "bpm100";
	}

	@GetMapping("/bpm120")
	public String bpm120() {
		return "bpm120";
	}

	@GetMapping("/bpm135")
	public String bpm135() {
		return "bpm135";
	}
}
