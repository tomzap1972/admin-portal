using Microsoft.AspNetCore.Mvc;
using AdminPortal.API.Models;
using AdminPortal.API.Services;

namespace AdminPortal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ConfigController : ControllerBase
{
    private readonly ConfigService _configService;

    public ConfigController(ConfigService configService)
    {
        _configService = configService;
    }

    [HttpGet]
    public async Task<List<AppConfig>> GetAll() =>
        await _configService.GetAllAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<AppConfig>> GetById(string id)
    {
        var config = await _configService.GetByIdAsync(id);
        return config is null ? NotFound() : config;
    }

    [HttpPost]
    public async Task<ActionResult<AppConfig>> Create(AppConfig config)
    {
        var created = await _configService.CreateAsync(config);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, AppConfig config)
    {
        var existing = await _configService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        config.Id = id;
        await _configService.UpdateAsync(id, config);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _configService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _configService.DeleteAsync(id);
        return NoContent();
    }
}
