import React, { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import "./RichContentEditor.css";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Plus,
  Type,
  Quote,
  Image,
  Video,
  Code,
  Twitter,
  Instagram,
  Youtube,
  Facebook,
  Link,
  Move,
  Trash2,
  ChevronUp,
  ChevronDown,
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Upload,
  ImageIcon,
  X,
} from "lucide-react";
import "./RichContentEditor.css";

export interface ContentBlock {
  id: string;
  type:
    | "text"
    | "quote"
    | "image"
    | "video"
    | "html"
    | "social_twitter"
    | "social_instagram"
    | "social_youtube"
    | "social_facebook"
    | "embed";
  content: any;
  order: number;
}

interface RichContentEditorProps {
  initialContent?: ContentBlock[];
  onChange: (content: ContentBlock[]) => void;
  autoLineBreak?: boolean;
}

export function RichContentEditor({
  initialContent = [],
  onChange,
  autoLineBreak = false,
}: RichContentEditorProps) {
  const [blocks, setBlocks] = useState<ContentBlock[]>(initialContent);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [selectedBlockType, setSelectedBlockType] = useState<
    ContentBlock["type"] | null
  >(null);

  const addBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      id: `block_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      type,
      content: getDefaultContent(type),
      order: blocks.length,
    };

    const updatedBlocks = [...blocks, newBlock];
    setBlocks(updatedBlocks);
    onChange(updatedBlocks);
    setIsAddModalOpen(false);
    setSelectedBlockType(null);
  };

  const getDefaultContent = (type: ContentBlock["type"]) => {
    switch (type) {
      case "text":
        return {
          text: "",
          fontSize: "16",
          fontWeight: "normal",
          fontStyle: "normal",
          textDecoration: "none",
          textAlign: "left",
          marginTop: "0",
          marginBottom: "16",
          lineHeight: "1.5",
          color: "#000000",
          maxCharsPerLine: 80,
        };
      case "quote":
        return {
          text: "",
          author: "",
          source: "",
          fontSize: "18",
          fontStyle: "italic",
          textAlign: "center",
          marginTop: "24",
          marginBottom: "24",
          borderLeft: true,
          backgroundColor: "#f8f9fa",
        };
      case "image":
        return { url: "", caption: "", alt: "", uploadMode: "url", file: null };
      case "video":
        return { url: "", caption: "", type: "upload" };
      case "html":
        return { code: "" };
      case "social_twitter":
        return { url: "", embedCode: "" };
      case "social_instagram":
        return { url: "", embedCode: "" };
      case "social_youtube":
        return { url: "", embedCode: "" };
      case "social_facebook":
        return { url: "", embedCode: "" };
      case "embed":
        return { url: "", embedCode: "" };
      default:
        return {};
    }
  };

  const updateBlock = (id: string, content: any) => {
    const updatedBlocks = blocks.map((block) =>
      block.id === id ? { ...block, content } : block,
    );
    setBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  const deleteBlock = (id: string) => {
    const updatedBlocks = blocks.filter((block) => block.id !== id);
    setBlocks(updatedBlocks);
    onChange(updatedBlocks);
  };

  const moveBlock = (id: string, direction: "up" | "down") => {
    const blockIndex = blocks.findIndex((block) => block.id === id);
    if (
      (direction === "up" && blockIndex === 0) ||
      (direction === "down" && blockIndex === blocks.length - 1)
    ) {
      return;
    }

    const newBlocks = [...blocks];
    const targetIndex = direction === "up" ? blockIndex - 1 : blockIndex + 1;

    [newBlocks[blockIndex], newBlocks[targetIndex]] = [
      newBlocks[targetIndex],
      newBlocks[blockIndex],
    ];

    // Update order
    newBlocks.forEach((block, index) => {
      block.order = index;
    });

    setBlocks(newBlocks);
    onChange(newBlocks);
  };

  const blockTypes = [
    {
      type: "text" as const,
      label: "Texto",
      icon: Type,
      description: "Párrafo de texto normal",
    },
    {
      type: "quote" as const,
      label: "Cita",
      icon: Quote,
      description: "Cita destacada con autor",
    },
    {
      type: "image" as const,
      label: "Imagen",
      icon: Image,
      description: "Imagen con descripción",
    },
    {
      type: "video" as const,
      label: "Video",
      icon: Video,
      description: "Video subido o embebido",
    },
    {
      type: "html" as const,
      label: "HTML",
      icon: Code,
      description: "Código HTML personalizado",
    },
    {
      type: "social_twitter" as const,
      label: "Tweet",
      icon: Twitter,
      description: "Tweet embebido",
    },
    {
      type: "social_instagram" as const,
      label: "Instagram",
      icon: Instagram,
      description: "Post de Instagram",
    },
    {
      type: "social_youtube" as const,
      label: "YouTube",
      icon: Youtube,
      description: "Video de YouTube",
    },
    {
      type: "social_facebook" as const,
      label: "Facebook",
      icon: Facebook,
      description: "Post de Facebook",
    },
    {
      type: "embed" as const,
      label: "Embed",
      icon: Link,
      description: "Contenido embebido personalizado",
    },
  ];

  return (
    <div className="rich-content-editor">
      <div className="rich-content-editor__header">
        <h3 className="rich-content-editor__title">Editor de Contenido</h3>
        <Dialog open={isAddModalOpen} onOpenChange={setIsAddModalOpen}>
          <DialogTrigger asChild>
            <Button className="rich-content-editor__add-btn">
              <Plus className="h-4 w-4 mr-2" />
              Agregar Contenido
            </Button>
          </DialogTrigger>
          <DialogContent className="rich-content-editor__modal">
            <DialogHeader>
              <DialogTitle>Seleccionar Tipo de Contenido</DialogTitle>
            </DialogHeader>
            <div className="rich-content-editor__block-types">
              {blockTypes.map(({ type, label, icon: Icon, description }) => (
                <Card
                  key={type}
                  className="rich-content-editor__block-type"
                  onClick={() => addBlock(type)}
                >
                  <CardContent className="p-4">
                    <div className="flex items-center space-x-3">
                      <Icon className="h-6 w-6 text-primary" />
                      <div>
                        <h4 className="font-semibold">{label}</h4>
                        <p className="text-sm text-muted-foreground">
                          {description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </DialogContent>
        </Dialog>
      </div>

      <div className="rich-content-editor__blocks">
        {blocks.length === 0 ? (
          <div className="rich-content-editor__empty">
            <Type className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
            <p className="text-muted-foreground text-center mb-4">
              No hay contenido agregado. Comienza agregando un bloque de
              contenido.
            </p>
            <Button
              variant="outline"
              onClick={() => setIsAddModalOpen(true)}
              className="mx-auto"
            >
              <Plus className="h-4 w-4 mr-2" />
              Agregar Primer Bloque
            </Button>
          </div>
        ) : (
          blocks.map((block, index) => (
            <div key={block.id} className="rich-content-editor__block">
              <div className="rich-content-editor__block-header">
                <div className="rich-content-editor__block-info">
                  {React.createElement(
                    blockTypes.find((t) => t.type === block.type)?.icon || Type,
                    { className: "h-4 w-4" },
                  )}
                  <span className="rich-content-editor__block-type-label">
                    {blockTypes.find((t) => t.type === block.type)?.label}
                  </span>
                </div>
                <div className="rich-content-editor__block-actions">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveBlock(block.id, "up")}
                    disabled={index === 0}
                  >
                    <ChevronUp className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => moveBlock(block.id, "down")}
                    disabled={index === blocks.length - 1}
                  >
                    <ChevronDown className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => deleteBlock(block.id)}
                    className="text-red-500 hover:text-red-700"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>

              <ContentBlockEditor
                block={block}
                onChange={(content) => updateBlock(block.id, content)}
                autoLineBreak={autoLineBreak}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
}

interface ContentBlockEditorProps {
  block: ContentBlock;
  onChange: (content: any) => void;
  autoLineBreak?: boolean;
}

function ContentBlockEditor({
  block,
  onChange,
  autoLineBreak = false,
}: ContentBlockEditorProps) {
  const { type, content } = block;
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  // Auto line break with width limit
  const handleAutoLineBreak = (text: string) => {
    if (!autoLineBreak) return text;

    const maxCharsPerLine = content.maxCharsPerLine || 80;

    // Split by existing line breaks first
    const paragraphs = text.split(/\n|<br\s*\/?>/);

    const processedParagraphs = paragraphs.map((paragraph) => {
      if (paragraph.trim() === "") return "";

      const words = paragraph.split(" ");
      let currentLine = "";
      let result = "";

      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        const testLine = currentLine + (currentLine ? " " : "") + word;

        if (testLine.length > maxCharsPerLine && currentLine) {
          result += currentLine + "<br>";
          currentLine = word;
        } else {
          currentLine = testLine;
        }
      }

      if (currentLine) {
        result += currentLine;
      }

      return result;
    });

    return processedParagraphs.join("<br>");
  };

  const handleTextChange = (newText: string) => {
    // For immediate feedback, update the text as-is
    onChange({ ...content, text: newText });

    // If auto line break is enabled, process the text after a short delay
    if (autoLineBreak) {
      setTimeout(() => {
        const processedText = handleAutoLineBreak(newText);
        if (processedText !== newText) {
          onChange({ ...content, text: processedText });
        }
      }, 500); // Half second delay to avoid constant processing
    }
  };

  switch (type) {
    case "text":
      return (
        <div className="rich-content-editor__block-content">
          <div className="space-y-4">
            {/* Text Content */}
            <div>
              <Label htmlFor={`text-${block.id}`}>Contenido del Texto</Label>
              {autoLineBreak && (
                <p className="text-xs text-muted-foreground mb-2">
                  Auto line break activado (máx. {content.maxCharsPerLine || 80}{" "}
                  caracteres por línea)
                </p>
              )}
              <Textarea
                ref={textareaRef}
                id={`text-${block.id}`}
                value={content.text || ""}
                onChange={(e) => handleTextChange(e.target.value)}
                placeholder="Escribe el contenido del párrafo..."
                rows={4}
                style={{
                  fontSize: `${content.fontSize || 16}px`,
                  fontWeight: content.fontWeight || "normal",
                  fontStyle: content.fontStyle || "normal",
                  textDecoration: content.textDecoration || "none",
                  textAlign: (content.textAlign || "left") as any,
                  lineHeight: content.lineHeight || "1.5",
                  color: content.color || "#000000",
                }}
              />
            </div>

            {/* Formatting Controls */}
            <div className="rich-content-editor__formatting-grid">
              <h4>Formato del Texto</h4>

              {/* Text Style Buttons */}
              <div className="rich-content-editor__formatting-section">
                <Label className="text-xs">Estilo</Label>
                <div className="flex gap-1">
                  <Button
                    variant={
                      content.fontWeight === "bold" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      onChange({
                        ...content,
                        fontWeight:
                          content.fontWeight === "bold" ? "normal" : "bold",
                      })
                    }
                  >
                    <Bold className="h-3 w-3" />
                  </Button>
                  <Button
                    variant={
                      content.fontStyle === "italic" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      onChange({
                        ...content,
                        fontStyle:
                          content.fontStyle === "italic" ? "normal" : "italic",
                      })
                    }
                  >
                    <Italic className="h-3 w-3" />
                  </Button>
                  <Button
                    variant={
                      content.textDecoration === "underline"
                        ? "default"
                        : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      onChange({
                        ...content,
                        textDecoration:
                          content.textDecoration === "underline"
                            ? "none"
                            : "underline",
                      })
                    }
                  >
                    <Underline className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Text Alignment */}
              <div className="rich-content-editor__formatting-section">
                <Label className="text-xs">Alineación</Label>
                <div className="flex gap-1">
                  <Button
                    variant={
                      content.textAlign === "left" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => onChange({ ...content, textAlign: "left" })}
                  >
                    <AlignLeft className="h-3 w-3" />
                  </Button>
                  <Button
                    variant={
                      content.textAlign === "center" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      onChange({ ...content, textAlign: "center" })
                    }
                  >
                    <AlignCenter className="h-3 w-3" />
                  </Button>
                  <Button
                    variant={
                      content.textAlign === "right" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => onChange({ ...content, textAlign: "right" })}
                  >
                    <AlignRight className="h-3 w-3" />
                  </Button>
                  <Button
                    variant={
                      content.textAlign === "justify" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      onChange({ ...content, textAlign: "justify" })
                    }
                  >
                    <AlignJustify className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              {/* Font Size */}
              <div className="rich-content-editor__formatting-section">
                <Label htmlFor={`font-size-${block.id}`} className="text-xs">
                  Tamaño (px)
                </Label>
                <Input
                  id={`font-size-${block.id}`}
                  type="number"
                  min="10"
                  max="72"
                  value={content.fontSize || 16}
                  onChange={(e) =>
                    onChange({ ...content, fontSize: e.target.value })
                  }
                  className="h-8"
                />
              </div>

              {/* Line Height */}
              <div className="rich-content-editor__formatting-section">
                <Label htmlFor={`line-height-${block.id}`} className="text-xs">
                  Altura de Línea
                </Label>
                <Select
                  value={content.lineHeight || "1.5"}
                  onValueChange={(value) =>
                    onChange({ ...content, lineHeight: value })
                  }
                >
                  <SelectTrigger className="h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">1.0</SelectItem>
                    <SelectItem value="1.2">1.2</SelectItem>
                    <SelectItem value="1.4">1.4</SelectItem>
                    <SelectItem value="1.5">1.5</SelectItem>
                    <SelectItem value="1.6">1.6</SelectItem>
                    <SelectItem value="1.8">1.8</SelectItem>
                    <SelectItem value="2">2.0</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Text Color */}
              <div className="rich-content-editor__formatting-section">
                <Label htmlFor={`text-color-${block.id}`} className="text-xs">
                  Color del Texto
                </Label>
                <div className="rich-content-editor__color-input-group">
                  <Input
                    id={`text-color-${block.id}`}
                    type="color"
                    value={content.color || "#000000"}
                    onChange={(e) =>
                      onChange({ ...content, color: e.target.value })
                    }
                    className="h-8 w-16 p-1"
                  />
                  <Input
                    type="text"
                    value={content.color || "#000000"}
                    onChange={(e) =>
                      onChange({ ...content, color: e.target.value })
                    }
                    placeholder="#000000"
                    className="h-8 flex-1"
                  />
                </div>
              </div>

              {/* Margins */}
              <div className="rich-content-editor__formatting-section">
                <Label className="text-xs">Margen Superior (px)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={content.marginTop || 0}
                  onChange={(e) =>
                    onChange({ ...content, marginTop: e.target.value })
                  }
                  className="h-8"
                />
              </div>

              <div className="rich-content-editor__formatting-section">
                <Label className="text-xs">Margen Inferior (px)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={content.marginBottom || 16}
                  onChange={(e) =>
                    onChange({ ...content, marginBottom: e.target.value })
                  }
                  className="h-8"
                />
              </div>

              {/* Auto Line Break Configuration */}
              {autoLineBreak && (
                <div className="rich-content-editor__formatting-section">
                  <Label className="text-xs">Caracteres por línea</Label>
                  <div className="flex gap-2">
                    <Input
                      type="number"
                      min="40"
                      max="120"
                      value={content.maxCharsPerLine || 80}
                      onChange={(e) =>
                        onChange({
                          ...content,
                          maxCharsPerLine: parseInt(e.target.value) || 80,
                        })
                      }
                      className="h-8 flex-1"
                    />
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => {
                        const processedText = handleAutoLineBreak(
                          content.text || "",
                        );
                        onChange({ ...content, text: processedText });
                      }}
                      className="h-8 px-3"
                    >
                      Aplicar
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Preview */}
            {content.text && (
              <div className="rich-content-editor__preview">
                <Label className="rich-content-editor__preview-label">
                  Vista Previa:
                </Label>
                <div
                  className="mt-2 p-4 border rounded"
                  style={{
                    fontSize: `${content.fontSize || 16}px`,
                    fontWeight: content.fontWeight || "normal",
                    fontStyle: content.fontStyle || "normal",
                    textDecoration: content.textDecoration || "none",
                    textAlign: (content.textAlign || "left") as any,
                    lineHeight: content.lineHeight || "1.5",
                    color: content.color || "#000000",
                    marginTop: `${content.marginTop || 0}px`,
                    marginBottom: `${content.marginBottom || 16}px`,
                  }}
                  dangerouslySetInnerHTML={{
                    __html: content.text.replace(/\n/g, "<br>"),
                  }}
                />
              </div>
            )}
          </div>
        </div>
      );

    case "quote":
      return (
        <div className="rich-content-editor__block-content">
          <div className="space-y-4">
            <div>
              <Label htmlFor={`quote-text-${block.id}`}>Texto de la Cita</Label>
              <Textarea
                id={`quote-text-${block.id}`}
                value={content.text || ""}
                onChange={(e) => onChange({ ...content, text: e.target.value })}
                placeholder="Texto de la cita..."
                rows={3}
                style={{
                  fontSize: `${content.fontSize || 18}px`,
                  fontStyle: content.fontStyle || "italic",
                  textAlign: (content.textAlign || "center") as any,
                }}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor={`quote-author-${block.id}`}>Autor</Label>
                <Input
                  id={`quote-author-${block.id}`}
                  value={content.author || ""}
                  onChange={(e) =>
                    onChange({ ...content, author: e.target.value })
                  }
                  placeholder="Nombre del autor"
                />
              </div>
              <div>
                <Label htmlFor={`quote-source-${block.id}`}>
                  Fuente (opcional)
                </Label>
                <Input
                  id={`quote-source-${block.id}`}
                  value={content.source || ""}
                  onChange={(e) =>
                    onChange({ ...content, source: e.target.value })
                  }
                  placeholder="Fuente de la cita"
                />
              </div>
            </div>

            {/* Quote Formatting */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-4 border rounded-lg bg-muted/30">
              <h4 className="col-span-full text-sm font-medium mb-2">
                Formato de la Cita
              </h4>

              <div className="space-y-2">
                <Label
                  htmlFor={`quote-font-size-${block.id}`}
                  className="text-xs"
                >
                  Tamaño (px)
                </Label>
                <Input
                  id={`quote-font-size-${block.id}`}
                  type="number"
                  min="12"
                  max="48"
                  value={content.fontSize || 18}
                  onChange={(e) =>
                    onChange({ ...content, fontSize: e.target.value })
                  }
                  className="h-8"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Alineación</Label>
                <div className="flex gap-1">
                  <Button
                    variant={
                      content.textAlign === "left" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => onChange({ ...content, textAlign: "left" })}
                  >
                    <AlignLeft className="h-3 w-3" />
                  </Button>
                  <Button
                    variant={
                      content.textAlign === "center" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() =>
                      onChange({ ...content, textAlign: "center" })
                    }
                  >
                    <AlignCenter className="h-3 w-3" />
                  </Button>
                  <Button
                    variant={
                      content.textAlign === "right" ? "default" : "outline"
                    }
                    size="sm"
                    onClick={() => onChange({ ...content, textAlign: "right" })}
                  >
                    <AlignRight className="h-3 w-3" />
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Margen Superior (px)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={content.marginTop || 24}
                  onChange={(e) =>
                    onChange({ ...content, marginTop: e.target.value })
                  }
                  className="h-8"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-xs">Margen Inferior (px)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  value={content.marginBottom || 24}
                  onChange={(e) =>
                    onChange({ ...content, marginBottom: e.target.value })
                  }
                  className="h-8"
                />
              </div>

              <div className="space-y-2">
                <Label
                  htmlFor={`quote-bg-color-${block.id}`}
                  className="text-xs"
                >
                  Color de Fondo
                </Label>
                <div className="flex gap-2">
                  <Input
                    id={`quote-bg-color-${block.id}`}
                    type="color"
                    value={content.backgroundColor || "#f8f9fa"}
                    onChange={(e) =>
                      onChange({ ...content, backgroundColor: e.target.value })
                    }
                    className="h-8 w-16 p-1"
                  />
                  <Input
                    type="text"
                    value={content.backgroundColor || "#f8f9fa"}
                    onChange={(e) =>
                      onChange({ ...content, backgroundColor: e.target.value })
                    }
                    placeholder="#f8f9fa"
                    className="h-8 flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    id={`quote-border-${block.id}`}
                    checked={content.borderLeft || false}
                    onChange={(e) =>
                      onChange({ ...content, borderLeft: e.target.checked })
                    }
                    className="rounded"
                  />
                  <Label
                    htmlFor={`quote-border-${block.id}`}
                    className="text-xs"
                  >
                    Borde Izquierdo
                  </Label>
                </div>
              </div>
            </div>

            {/* Quote Preview */}
            {content.text && (
              <div className="rich-content-editor__preview">
                <Label className="text-xs text-muted-foreground">
                  Vista Previa:
                </Label>
                <blockquote
                  className="mt-2 p-4 rounded"
                  style={{
                    fontSize: `${content.fontSize || 18}px`,
                    fontStyle: content.fontStyle || "italic",
                    textAlign: (content.textAlign || "center") as any,
                    marginTop: `${content.marginTop || 24}px`,
                    marginBottom: `${content.marginBottom || 24}px`,
                    backgroundColor: content.backgroundColor || "#f8f9fa",
                    borderLeft: content.borderLeft
                      ? "4px solid #3b82f6"
                      : "none",
                    paddingLeft: content.borderLeft ? "20px" : "16px",
                  }}
                >
                  <p className="mb-2">{content.text}</p>
                  {content.author && (
                    <cite className="text-sm opacity-80">
                      — {content.author}
                      {content.source && `, ${content.source}`}
                    </cite>
                  )}
                </blockquote>
              </div>
            )}
          </div>
        </div>
      );

    case "image":
      return (
        <div className="rich-content-editor__block-content">
          <div className="space-y-4">
            {/* Image mode toggle */}
            <div className="flex gap-2 mb-3">
              <Button
                type="button"
                variant={
                  content.uploadMode === "url" || !content.uploadMode
                    ? "default"
                    : "outline"
                }
                size="sm"
                onClick={() => {
                  onChange({ ...content, uploadMode: "url", file: null });
                  if (content.url && content.url.startsWith("data:image/")) {
                    onChange({
                      ...content,
                      url: "",
                      uploadMode: "url",
                      file: null,
                    });
                  }
                }}
                className="flex items-center gap-2"
              >
                <Link className="h-4 w-4" />
                URL
              </Button>
              <Button
                type="button"
                variant={
                  content.uploadMode === "upload" ? "default" : "outline"
                }
                size="sm"
                onClick={() => onChange({ ...content, uploadMode: "upload" })}
                className="flex items-center gap-2"
              >
                <Upload className="h-4 w-4" />
                Subir Archivo
              </Button>
            </div>

            {/* Image input based on mode */}
            {content.uploadMode === "upload" ? (
              <div className="space-y-3">
                <Label>Subir Imagen</Label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => {
                    const file = e.target.files?.[0];
                    if (file && file.type.startsWith("image/")) {
                      const reader = new FileReader();
                      reader.onload = (event) => {
                        const result = event.target?.result as string;
                        onChange({ ...content, url: result, file: file });
                      };
                      reader.readAsDataURL(file);
                    }
                  }}
                  className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
                {content.file && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <ImageIcon className="h-4 w-4" />
                    {content.file.name}
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() =>
                        onChange({ ...content, url: "", file: null })
                      }
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </div>
                )}
              </div>
            ) : (
              <div>
                <Label htmlFor={`image-url-${block.id}`}>
                  URL de la Imagen
                </Label>
                <Input
                  id={`image-url-${block.id}`}
                  value={content.url || ""}
                  onChange={(e) =>
                    onChange({ ...content, url: e.target.value })
                  }
                  placeholder="https://ejemplo.com/imagen.jpg"
                />
              </div>
            )}

            <div>
              <Label htmlFor={`image-caption-${block.id}`}>Descripción</Label>
              <Input
                id={`image-caption-${block.id}`}
                value={content.caption || ""}
                onChange={(e) =>
                  onChange({ ...content, caption: e.target.value })
                }
                placeholder="Descripción de la imagen"
              />
            </div>
            <div>
              <Label htmlFor={`image-alt-${block.id}`}>Texto Alternativo</Label>
              <Input
                id={`image-alt-${block.id}`}
                value={content.alt || ""}
                onChange={(e) => onChange({ ...content, alt: e.target.value })}
                placeholder="Texto alternativo para accesibilidad"
              />
            </div>
            {content.url && (
              <div className="rich-content-editor__preview">
                <Label className="text-xs text-muted-foreground">
                  Vista Previa:
                </Label>
                <img
                  src={content.url}
                  alt={content.alt || "Preview"}
                  className="max-w-full h-auto rounded mt-2"
                  onError={(e) => {
                    e.currentTarget.style.display = "none";
                  }}
                />
              </div>
            )}
          </div>
        </div>
      );

    case "video":
      return (
        <div className="rich-content-editor__block-content">
          <div className="space-y-4">
            <div>
              <Label htmlFor={`video-type-${block.id}`}>Tipo de Video</Label>
              <Select
                value={content.type || "upload"}
                onValueChange={(value) => onChange({ ...content, type: value })}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="upload">Video Subido</SelectItem>
                  <SelectItem value="youtube">YouTube</SelectItem>
                  <SelectItem value="vimeo">Vimeo</SelectItem>
                  <SelectItem value="embed">Código Embed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label htmlFor={`video-url-${block.id}`}>
                {content.type === "embed" ? "Código Embed" : "URL del Video"}
              </Label>
              {content.type === "embed" ? (
                <Textarea
                  id={`video-url-${block.id}`}
                  value={content.url || ""}
                  onChange={(e) =>
                    onChange({ ...content, url: e.target.value })
                  }
                  placeholder="<iframe src=..."
                  rows={3}
                />
              ) : (
                <Input
                  id={`video-url-${block.id}`}
                  value={content.url || ""}
                  onChange={(e) =>
                    onChange({ ...content, url: e.target.value })
                  }
                  placeholder="https://youtube.com/watch?v=..."
                />
              )}
            </div>
            <div>
              <Label htmlFor={`video-caption-${block.id}`}>Descripción</Label>
              <Input
                id={`video-caption-${block.id}`}
                value={content.caption || ""}
                onChange={(e) =>
                  onChange({ ...content, caption: e.target.value })
                }
                placeholder="Descripción del video"
              />
            </div>
          </div>
        </div>
      );

    case "html":
      return (
        <div className="rich-content-editor__block-content">
          <div className="space-y-4">
            <Label htmlFor={`html-${block.id}`}>Código HTML</Label>
            <Textarea
              id={`html-${block.id}`}
              value={content.code || ""}
              onChange={(e) => onChange({ ...content, code: e.target.value })}
              placeholder="<div>Tu código HTML aquí...</div>"
              rows={6}
              className="font-mono"
            />
            {content.code && (
              <div className="rich-content-editor__preview">
                <p className="text-sm text-muted-foreground mb-2">
                  Vista previa:
                </p>
                <div
                  className="border rounded p-4"
                  dangerouslySetInnerHTML={{ __html: content.code }}
                />
              </div>
            )}
          </div>
        </div>
      );

    case "social_twitter":
    case "social_instagram":
    case "social_youtube":
    case "social_facebook":
      const platformName = type.split("_")[1];
      return (
        <div className="rich-content-editor__block-content">
          <div className="space-y-4">
            <div>
              <Label htmlFor={`social-url-${block.id}`}>
                URL del {platformName}
              </Label>
              <Input
                id={`social-url-${block.id}`}
                value={content.url || ""}
                onChange={(e) => onChange({ ...content, url: e.target.value })}
                placeholder={`https://${platformName}.com/...`}
              />
            </div>
            <div>
              <Label htmlFor={`social-embed-${block.id}`}>
                Código Embed (opcional)
              </Label>
              <Textarea
                id={`social-embed-${block.id}`}
                value={content.embedCode || ""}
                onChange={(e) =>
                  onChange({ ...content, embedCode: e.target.value })
                }
                placeholder="Pega aquí el código embed del post..."
                rows={4}
              />
            </div>
          </div>
        </div>
      );

    case "embed":
      return (
        <div className="rich-content-editor__block-content">
          <div className="space-y-4">
            <div>
              <Label htmlFor={`embed-url-${block.id}`}>URL</Label>
              <Input
                id={`embed-url-${block.id}`}
                value={content.url || ""}
                onChange={(e) => onChange({ ...content, url: e.target.value })}
                placeholder="https://ejemplo.com"
              />
            </div>
            <div>
              <Label htmlFor={`embed-code-${block.id}`}>Código Embed</Label>
              <Textarea
                id={`embed-code-${block.id}`}
                value={content.embedCode || ""}
                onChange={(e) =>
                  onChange({ ...content, embedCode: e.target.value })
                }
                placeholder="<iframe src=..."
                rows={4}
              />
            </div>
          </div>
        </div>
      );

    default:
      return <div>Tipo de contenido no soportado</div>;
  }
}
