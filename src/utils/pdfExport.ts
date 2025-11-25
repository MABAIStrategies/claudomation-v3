/**
 * PDF Export Utilities
 *
 * Generate fantasy-styled PDF reports with ROI calculations,
 * workflow summaries, and package recommendations.
 */

import jsPDF from 'jspdf';
import type { JourneyState, ROICalculation, AccumulatedSavings } from '../types';
import { automationJourneyConfig } from '../config/automationJourneyConfig';
import { formatCurrency } from './roiCalculations';

interface PDFExportOptions {
  state: JourneyState;
  roiCalculation: ROICalculation;
  accumulatedSavings: AccumulatedSavings;
}

/**
 * Generate a fantasy-styled PDF proposal
 */
export async function generateProposalPDF(options: PDFExportOptions): Promise<void> {
  const { state, roiCalculation, accumulatedSavings } = options;

  // Create PDF with medieval parchment aesthetic
  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const pageHeight = pdf.internal.pageSize.getHeight();
  const margin = 20;
  const contentWidth = pageWidth - (margin * 2);

  // Add parchment background texture
  pdf.setFillColor(250, 240, 215); // Parchment color
  pdf.rect(0, 0, pageWidth, pageHeight, 'F');

  // Ornate border
  pdf.setDrawColor(139, 115, 85); // Brown border
  pdf.setLineWidth(2);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);
  pdf.setLineWidth(0.5);
  pdf.rect(12, 12, pageWidth - 24, pageHeight - 24);

  let yPos = 30;

  // === TITLE PAGE ===
  // Ornate title banner
  pdf.setFillColor(212, 175, 55); // Gold
  pdf.rect(margin, yPos, contentWidth, 20, 'F');

  pdf.setFont('helvetica', 'bold');
  pdf.setFontSize(24);
  pdf.setTextColor(43, 27, 14); // Dark brown
  pdf.text('AI AUTOMATION PROPOSAL', pageWidth / 2, yPos + 13, { align: 'center' });

  yPos += 30;

  // Company branding
  pdf.setFontSize(16);
  pdf.setTextColor(139, 115, 85);
  pdf.text(automationJourneyConfig.brand.companyName, pageWidth / 2, yPos, { align: 'center' });

  yPos += 15;

  // Prepared for
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`Prepared for: ${state.viewerName || 'Prospective Client'}`, pageWidth / 2, yPos, { align: 'center' });

  yPos += 8;

  // Date
  pdf.setFontSize(10);
  pdf.setTextColor(120, 100, 80);
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  pdf.text(`Date: ${today}`, pageWidth / 2, yPos, { align: 'center' });

  yPos += 25;

  // Decorative divider
  pdf.setDrawColor(212, 175, 55);
  pdf.setLineWidth(1);
  pdf.line(margin, yPos, pageWidth - margin, yPos);
  yPos += 10;

  // === EXECUTIVE SUMMARY ===
  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(43, 27, 14);
  pdf.text('EXECUTIVE SUMMARY', margin, yPos);
  yPos += 10;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(60, 40, 20);

  const summaryText = `This proposal outlines a comprehensive AI-powered automation solution tailored for ${state.viewerName || 'your organization'}. Our analysis indicates significant opportunities for operational efficiency and cost savings through strategic automation of key workflows.`;

  const splitSummary = pdf.splitTextToSize(summaryText, contentWidth);
  pdf.text(splitSummary, margin, yPos);
  yPos += splitSummary.length * 6 + 10;

  // === ROI HIGHLIGHTS (in ornate boxes) ===
  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text('KEY FINANCIAL METRICS', margin, yPos);
  yPos += 10;

  const metrics = [
    { label: 'Estimated Annual ROI', value: formatCurrency(roiCalculation.estimatedAnnualROI), icon: '💰' },
    { label: 'Time Saved Per Year', value: `${roiCalculation.estimatedTimeSavedPerYear.toLocaleString()} hours`, icon: '⏱️' },
    { label: 'Payback Period', value: `${roiCalculation.estimatedPaybackPeriod} months`, icon: '📈' },
    { label: 'Total Investment', value: formatCurrency(accumulatedSavings.totalCostUSD), icon: '💵' },
  ];

  metrics.forEach((metric, index) => {
    if (index % 2 === 0 && index > 0) {
      yPos += 25;
    }

    const xPos = index % 2 === 0 ? margin : pageWidth / 2 + 5;
    const boxWidth = (contentWidth / 2) - 5;

    // Metric box with gold border
    pdf.setFillColor(255, 251, 235); // Light parchment
    pdf.setDrawColor(212, 175, 55); // Gold border
    pdf.setLineWidth(1);
    pdf.roundedRect(xPos, yPos, boxWidth, 20, 2, 2, 'FD');

    // Metric label
    pdf.setFontSize(9);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(120, 100, 80);
    pdf.text(metric.label, xPos + 3, yPos + 6);

    // Metric value
    pdf.setFontSize(12);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(43, 27, 14);
    pdf.text(metric.value, xPos + 3, yPos + 14);
  });

  yPos += 35;

  // === SELECTED SOLUTIONS ===
  if (state.cartLineItems.length > 0) {
    pdf.addPage();
    yPos = 30;

    // Ornate border on new page
    pdf.setDrawColor(139, 115, 85);
    pdf.setLineWidth(2);
    pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);
    pdf.setLineWidth(0.5);
    pdf.rect(12, 12, pageWidth - 24, pageHeight - 24);

    pdf.setFontSize(16);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(43, 27, 14);
    pdf.text('RECOMMENDED SOLUTIONS', margin, yPos);
    yPos += 12;

    state.cartLineItems.forEach((item, index) => {
      if (yPos > pageHeight - 60) {
        pdf.addPage();
        yPos = 30;
      }

      // Chapter box
      pdf.setFillColor(252, 243, 225);
      pdf.setDrawColor(212, 175, 55);
      pdf.setLineWidth(0.5);
      pdf.roundedRect(margin, yPos, contentWidth, 35, 2, 2, 'FD');

      // Chapter number and title
      pdf.setFontSize(12);
      pdf.setFont('helvetica', 'bold');
      pdf.setTextColor(43, 27, 14);
      pdf.text(`${index + 1}. ${item.chapterTitle}`, margin + 3, yPos + 8);

      // Cost and savings
      pdf.setFontSize(10);
      pdf.setFont('helvetica', 'normal');
      pdf.setTextColor(80, 60, 40);
      pdf.text(`Investment: ${formatCurrency(item.costUSD)}`, margin + 3, yPos + 16);
      pdf.text(`Annual Savings: ${formatCurrency(item.savings.dollarsPerYear)}`, margin + 3, yPos + 23);
      pdf.text(`Time Saved: ${item.savings.hoursPerWeek} hrs/week`, margin + 3, yPos + 30);

      yPos += 40;
    });
  }

  // === PACKAGE RECOMMENDATION ===
  if (state.selectedPackage) {
    if (yPos > pageHeight - 80) {
      pdf.addPage();
      yPos = 30;
    }

    yPos += 10;
    pdf.setFillColor(212, 175, 55);
    pdf.rect(margin, yPos, contentWidth, 12, 'F');

    pdf.setFontSize(14);
    pdf.setFont('helvetica', 'bold');
    pdf.setTextColor(255, 255, 255);
    pdf.text(`RECOMMENDED PACKAGE: ${state.selectedPackage.tier}`, pageWidth / 2, yPos + 8, { align: 'center' });

    yPos += 20;

    pdf.setFontSize(11);
    pdf.setFont('helvetica', 'normal');
    pdf.setTextColor(43, 27, 14);
    pdf.text(`Total Investment: ${formatCurrency(state.selectedPackage.priceUSD)}`, margin + 3, yPos);

    yPos += 8;
    const packageDesc = pdf.splitTextToSize(state.selectedPackage.description, contentWidth - 6);
    pdf.text(packageDesc, margin + 3, yPos);
  }

  // === NEXT STEPS (Final Page) ===
  pdf.addPage();
  yPos = 30;

  // Ornate border
  pdf.setDrawColor(139, 115, 85);
  pdf.setLineWidth(2);
  pdf.rect(10, 10, pageWidth - 20, pageHeight - 20);
  pdf.setLineWidth(0.5);
  pdf.rect(12, 12, pageWidth - 24, pageHeight - 24);

  pdf.setFillColor(16, 185, 129); // Emerald
  pdf.rect(margin, yPos, contentWidth, 12, 'F');

  pdf.setFontSize(16);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text('NEXT STEPS', pageWidth / 2, yPos + 8, { align: 'center' });

  yPos += 25;

  pdf.setFontSize(11);
  pdf.setFont('helvetica', 'normal');
  pdf.setTextColor(43, 27, 14);

  const nextSteps = [
    '1. Schedule a discovery call to review your specific workflows',
    '2. Conduct a detailed process audit and customization assessment',
    '3. Finalize technical requirements and integration points',
    '4. Begin phased implementation with your dedicated team',
    '5. Launch with training, support, and continuous optimization',
  ];

  nextSteps.forEach((step) => {
    const lines = pdf.splitTextToSize(step, contentWidth - 10);
    pdf.text(lines, margin + 5, yPos);
    yPos += lines.length * 6 + 4;
  });

  yPos += 15;

  // Contact CTA
  pdf.setFillColor(255, 251, 235);
  pdf.setDrawColor(212, 175, 55);
  pdf.setLineWidth(1);
  pdf.roundedRect(margin, yPos, contentWidth, 30, 3, 3, 'FD');

  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(43, 27, 14);
  pdf.text('Ready to get started?', pageWidth / 2, yPos + 10, { align: 'center' });

  pdf.setFontSize(10);
  pdf.setFont('helvetica', 'normal');
  pdf.text('Contact us today to schedule your consultation.', pageWidth / 2, yPos + 18, { align: 'center' });

  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(16, 185, 129);
  pdf.text(automationJourneyConfig.brand.companyName, pageWidth / 2, yPos + 25, { align: 'center' });

  // Wax seal decoration in bottom right
  pdf.setFillColor(220, 38, 38); // Red wax
  pdf.circle(pageWidth - 30, pageHeight - 30, 12, 'F');
  pdf.setFontSize(8);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(255, 255, 255);
  pdf.text('MAB', pageWidth - 30, pageHeight - 28, { align: 'center' });

  // Download the PDF
  const fileName = `${state.viewerName?.replace(/\s+/g, '_') || 'Automation'}_Proposal_${new Date().getTime()}.pdf`;
  pdf.save(fileName);
}

/**
 * Generate a quick ROI summary PDF
 */
export async function generateROISummaryPDF(options: PDFExportOptions): Promise<void> {
  const { state, roiCalculation, accumulatedSavings } = options;

  const pdf = new jsPDF({
    orientation: 'portrait',
    unit: 'mm',
    format: 'a4',
  });

  const pageWidth = pdf.internal.pageSize.getWidth();
  const margin = 20;

  // Parchment background
  pdf.setFillColor(250, 240, 215);
  pdf.rect(0, 0, pageWidth, pdf.internal.pageSize.getHeight(), 'F');

  let yPos = 30;

  // Title
  pdf.setFillColor(212, 175, 55);
  pdf.rect(margin, yPos, pageWidth - (margin * 2), 15, 'F');
  pdf.setFontSize(18);
  pdf.setFont('helvetica', 'bold');
  pdf.setTextColor(43, 27, 14);
  pdf.text('ROI SUMMARY', pageWidth / 2, yPos + 10, { align: 'center' });

  yPos += 25;

  // Quick stats
  pdf.setFontSize(12);
  pdf.setFont('helvetica', 'normal');
  pdf.text(`For: ${state.viewerName || 'Client'}`, margin, yPos);
  yPos += 10;

  pdf.setFontSize(14);
  pdf.setFont('helvetica', 'bold');
  pdf.text(`Annual ROI: ${formatCurrency(roiCalculation.estimatedAnnualROI)}`, margin, yPos);
  yPos += 10;

  pdf.text(`Payback: ${roiCalculation.estimatedPaybackPeriod} months`, margin, yPos);
  yPos += 10;

  pdf.text(`Investment: ${formatCurrency(accumulatedSavings.totalCostUSD)}`, margin, yPos);

  // Download
  const fileName = `ROI_Summary_${new Date().getTime()}.pdf`;
  pdf.save(fileName);
}
