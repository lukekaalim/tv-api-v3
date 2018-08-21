# Sitecore CMS

The Sitecore CMS is a tree-based content management system that the producers of 9now use
to organize content across the web, mobile and tv devices. It features a rich type and
templating system, and is available as a REST api.

However, this API returns data in a normalized, flattened format for ease of use, size, and
packaging purposes.

As such, we need a strategy to unleave the tree and return it in a normalized format.

## Response

The CMS API responses are fairly standard, but have some quirks.

```
{
  id: string // GUID of the item
  templateId: string // GUID of the template
  items: Array<{ id: string }> // And array of Urls
}
```

## Tree Parsing
To being unleaving the tree, we start at a root node.