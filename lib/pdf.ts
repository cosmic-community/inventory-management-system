import jsPDF from 'jspdf'
import autoTable from 'jspdf-autotable'
import { Invoice, Quotation, InvoiceItem } from '@/types'

export function generateInvoicePDF(invoice: Invoice): void {
  const doc = new jsPDF()
  
  // Header
  doc.setFontSize(24)
  doc.text('INVOICE', 20, 20)
  
  doc.setFontSize(10)
  doc.text(`Invoice #: ${invoice.metadata.invoice_number}`, 20, 30)
  doc.text(`Date: ${new Date(invoice.metadata.invoice_date).toLocaleDateString()}`, 20, 36)
  doc.text(`Due Date: ${new Date(invoice.metadata.due_date).toLocaleDateString()}`, 20, 42)
  
  // Customer info
  doc.setFontSize(12)
  doc.text('Bill To:', 20, 55)
  doc.setFontSize(10)
  doc.text(invoice.metadata.customer_name, 20, 62)
  if (invoice.metadata.customer_email) {
    doc.text(invoice.metadata.customer_email, 20, 68)
  }
  
  // Parse items from JSON string if needed
  let items: InvoiceItem[] = []
  if (typeof invoice.metadata.items === 'string') {
    try {
      items = JSON.parse(invoice.metadata.items)
    } catch (e) {
      items = invoice.metadata.items as any
    }
  } else {
    items = invoice.metadata.items
  }
  
  // Items table
  autoTable(doc, {
    startY: 80,
    head: [['Description', 'Quantity', 'Price', 'Total']],
    body: items.map(item => [
      item.description,
      item.quantity.toString(),
      `$${item.price.toFixed(2)}`,
      `$${item.total.toFixed(2)}`
    ]),
    theme: 'grid',
  })
  
  // Totals
  const finalY = (doc as any).lastAutoTable.finalY || 150
  doc.text(`Subtotal: $${invoice.metadata.subtotal.toFixed(2)}`, 140, finalY + 10)
  if (invoice.metadata.tax) {
    doc.text(`Tax: $${invoice.metadata.tax.toFixed(2)}`, 140, finalY + 16)
  }
  doc.setFontSize(12)
  doc.text(`Total: $${invoice.metadata.total.toFixed(2)}`, 140, finalY + 24)
  
  // Notes
  if (invoice.metadata.notes) {
    doc.setFontSize(10)
    doc.text('Notes:', 20, finalY + 40)
    doc.text(invoice.metadata.notes, 20, finalY + 46, { maxWidth: 170 })
  }
  
  // Status
  doc.setFontSize(10)
  doc.text(`Status: ${invoice.metadata.status.value}`, 20, finalY + 60)
  
  // Save
  doc.save(`invoice-${invoice.metadata.invoice_number}.pdf`)
}

export function generateQuotationPDF(quotation: Quotation): void {
  const doc = new jsPDF()
  
  // Header
  doc.setFontSize(24)
  doc.text('QUOTATION', 20, 20)
  
  doc.setFontSize(10)
  doc.text(`Quote #: ${quotation.metadata.quote_number}`, 20, 30)
  doc.text(`Date: ${new Date(quotation.metadata.quote_date).toLocaleDateString()}`, 20, 36)
  doc.text(`Valid Until: ${new Date(quotation.metadata.valid_until).toLocaleDateString()}`, 20, 42)
  
  // Customer info
  doc.setFontSize(12)
  doc.text('Prepared For:', 20, 55)
  doc.setFontSize(10)
  doc.text(quotation.metadata.customer_name, 20, 62)
  if (quotation.metadata.customer_email) {
    doc.text(quotation.metadata.customer_email, 20, 68)
  }
  
  // Parse items from JSON string if needed
  let items: InvoiceItem[] = []
  if (typeof quotation.metadata.items === 'string') {
    try {
      items = JSON.parse(quotation.metadata.items)
    } catch (e) {
      items = quotation.metadata.items as any
    }
  } else {
    items = quotation.metadata.items
  }
  
  // Items table
  autoTable(doc, {
    startY: 80,
    head: [['Description', 'Quantity', 'Price', 'Total']],
    body: items.map(item => [
      item.description,
      item.quantity.toString(),
      `$${item.price.toFixed(2)}`,
      `$${item.total.toFixed(2)}`
    ]),
    theme: 'grid',
  })
  
  // Totals
  const finalY = (doc as any).lastAutoTable.finalY || 150
  doc.text(`Subtotal: $${quotation.metadata.subtotal.toFixed(2)}`, 140, finalY + 10)
  if (quotation.metadata.tax) {
    doc.text(`Tax: $${quotation.metadata.tax.toFixed(2)}`, 140, finalY + 16)
  }
  doc.setFontSize(12)
  doc.text(`Total: $${quotation.metadata.total.toFixed(2)}`, 140, finalY + 24)
  
  // Notes
  if (quotation.metadata.notes) {
    doc.setFontSize(10)
    doc.text('Notes:', 20, finalY + 40)
    doc.text(quotation.metadata.notes, 20, finalY + 46, { maxWidth: 170 })
  }
  
  // Status
  doc.setFontSize(10)
  doc.text(`Status: ${quotation.metadata.status.value}`, 20, finalY + 60)
  
  // Save
  doc.save(`quotation-${quotation.metadata.quote_number}.pdf`)
}