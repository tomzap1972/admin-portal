using Microsoft.AspNetCore.Mvc;
using AdminPortal.API.Models;
using AdminPortal.API.Services;

namespace AdminPortal.API.Controllers;

[ApiController]
[Route("api/[controller]")]
public class ContentController : ControllerBase
{
    private readonly ContentService _contentService;

    public ContentController(ContentService contentService)
    {
        _contentService = contentService;
    }

    [HttpGet]
    public async Task<List<ContentItem>> GetAll() =>
        await _contentService.GetAllAsync();

    [HttpGet("{id}")]
    public async Task<ActionResult<ContentItem>> GetById(string id)
    {
        var item = await _contentService.GetByIdAsync(id);
        return item is null ? NotFound() : item;
    }

    [HttpPost]
    public async Task<ActionResult<ContentItem>> Create(ContentItem item)
    {
        var created = await _contentService.CreateAsync(item);
        return CreatedAtAction(nameof(GetById), new { id = created.Id }, created);
    }

    [HttpPut("{id}")]
    public async Task<IActionResult> Update(string id, ContentItem item)
    {
        var existing = await _contentService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        item.Id = id;
        await _contentService.UpdateAsync(id, item);
        return NoContent();
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> Delete(string id)
    {
        var existing = await _contentService.GetByIdAsync(id);
        if (existing is null) return NotFound();

        await _contentService.DeleteAsync(id);
        return NoContent();
    }
}
