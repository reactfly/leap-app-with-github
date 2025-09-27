import React, { useState, useEffect } from 'react';
import { MapPin, Search, Phone, User, Mail, Home, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/components/ui/use-toast';
import { buscarCEP, formatarCEP, formatarTelefone, CEPData } from '../utils/cepService';

interface DeliveryFormProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (deliveryData: DeliveryData) => void;
  totalPrice: number;
  items: any[];
}

export interface DeliveryData {
  customer: {
    name: string;
    email: string;
    phone: string;
  };
  address: {
    cep: string;
    logradouro: string;
    numero: string;
    complemento: string;
    bairro: string;
    cidade: string;
    uf: string;
  };
  delivery: {
    estimatedTime: string;
    notes: string;
  };
}

export default function DeliveryForm({ isOpen, onClose, onConfirm, totalPrice, items }: DeliveryFormProps) {
  const [step, setStep] = useState(1);
  const [loadingCEP, setLoadingCEP] = useState(false);
  const [cepData, setCepData] = useState<CEPData | null>(null);
  const [formData, setFormData] = useState({
    customer: {
      name: '',
      email: '',
      phone: '',
    },
    address: {
      cep: '',
      logradouro: '',
      numero: '',
      complemento: '',
      bairro: '',
      cidade: '',
      uf: '',
    },
    delivery: {
      estimatedTime: '30-45 min',
      notes: '',
    }
  });

  const { toast } = useToast();

  const handleCEPChange = async (cep: string) => {
    const cepFormatted = formatarCEP(cep);
    setFormData(prev => ({
      ...prev,
      address: { ...prev.address, cep: cepFormatted }
    }));

    if (cep.replace(/\D/g, '').length === 8) {
      setLoadingCEP(true);
      const data = await buscarCEP(cep);
      setLoadingCEP(false);

      if (data) {
        setCepData(data);
        setFormData(prev => ({
          ...prev,
          address: {
            ...prev.address,
            logradouro: data.logradouro,
            bairro: data.bairro,
            cidade: data.localidade,
            uf: data.uf,
          }
        }));
        toast({
          title: "Endereço encontrado!",
          description: `${data.logradouro}, ${data.bairro}`,
        });
      } else {
        toast({
          title: "CEP não encontrado",
          description: "Verifique o CEP digitado",
          variant: "destructive",
        });
      }
    }
  };

  const handlePhoneChange = (phone: string) => {
    const formatted = formatarTelefone(phone);
    setFormData(prev => ({
      ...prev,
      customer: { ...prev.customer, phone: formatted }
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.customer.name.trim()) {
      toast({
        title: "Erro",
        description: "Nome é obrigatório",
        variant: "destructive",
      });
      return;
    }

    if (!formData.customer.phone.trim()) {
      toast({
        title: "Erro",
        description: "Telefone é obrigatório",
        variant: "destructive",
      });
      return;
    }

    if (!formData.address.cep.trim()) {
      toast({
        title: "Erro",
        description: "CEP é obrigatório",
        variant: "destructive",
      });
      return;
    }

    if (!formData.address.numero.trim()) {
      toast({
        title: "Erro",
        description: "Número é obrigatório",
        variant: "destructive",
      });
      return;
    }

    onConfirm(formData);
  };

  const generateWhatsAppMessage = () => {
    const itemsText = items.map(item => 
      `• ${item.pasta_type.name} com molho ${item.sauce.name} (${item.quantity}x)`
    ).join('\n');

    const addressText = `${formData.address.logradouro}, ${formData.address.numero}, ${formData.address.bairro}, ${formData.address.cidade}-${formData.address.uf}`;

    return `🍝 *PEDIDO FETUCCINE* 🍝

*Cliente:* ${formData.customer.name}
*Telefone:* ${formData.customer.phone}
*Email:* ${formData.customer.email || 'Não informado'}

*Endereço de entrega:*
${addressText}
CEP: ${formData.address.cep}

*Itens do pedido:*
${itemsText}

*Total:* R$ ${totalPrice.toFixed(2)}
*Tempo estimado:* ${formData.delivery.estimatedTime}

${formData.delivery.notes ? `*Observações:* ${formData.delivery.notes}` : ''}

_Pedido realizado via sistema Fetuccine_`;
  };

  const sendWhatsApp = () => {
    const message = generateWhatsAppMessage();
    const phoneNumber = formData.customer.phone.replace(/\D/g, '');
    const whatsappURL = `https://wa.me/55${phoneNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle className="flex items-center text-xl">
            <MapPin className="w-6 h-6 mr-2 text-orange-500" />
            Delivery Fetuccine
          </CardTitle>
          <Button variant="ghost" size="sm" onClick={onClose}>
            ✕
          </Button>
        </CardHeader>

        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Dados do Cliente */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <User className="w-5 h-5 mr-2 text-orange-500" />
                Dados do Cliente
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="name">Nome Completo *</Label>
                  <Input
                    id="name"
                    value={formData.customer.name}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      customer: { ...prev.customer, name: e.target.value }
                    }))}
                    placeholder="Digite seu nome completo"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="phone">Telefone/WhatsApp *</Label>
                  <Input
                    id="phone"
                    value={formData.customer.phone}
                    onChange={(e) => handlePhoneChange(e.target.value)}
                    placeholder="(11) 99999-9999"
                    required
                  />
                </div>
                
                <div className="md:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.customer.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      customer: { ...prev.customer, email: e.target.value }
                    }))}
                    placeholder="seu@email.com (opcional)"
                  />
                </div>
              </div>
            </div>

            {/* Endereço */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Home className="w-5 h-5 mr-2 text-orange-500" />
                Endereço de Entrega
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <Label htmlFor="cep">CEP *</Label>
                  <div className="flex">
                    <Input
                      id="cep"
                      value={formData.address.cep}
                      onChange={(e) => handleCEPChange(e.target.value)}
                      placeholder="00000-000"
                      maxLength={9}
                      required
                    />
                    {loadingCEP && (
                      <div className="ml-2 flex items-center">
                        <Search className="w-4 h-4 animate-spin" />
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="md:col-span-2">
                  <Label>Logradouro</Label>
                  <Input
                    value={formData.address.logradouro}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, logradouro: e.target.value }
                    }))}
                    placeholder="Rua, Avenida, etc."
                    disabled={!!cepData}
                  />
                </div>
                
                <div>
                  <Label htmlFor="numero">Número *</Label>
                  <Input
                    id="numero"
                    value={formData.address.numero}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, numero: e.target.value }
                    }))}
                    placeholder="123"
                    required
                  />
                </div>
                
                <div>
                  <Label htmlFor="complemento">Complemento</Label>
                  <Input
                    id="complemento"
                    value={formData.address.complemento}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, complemento: e.target.value }
                    }))}
                    placeholder="Apto, Casa, etc."
                  />
                </div>
                
                <div>
                  <Label>Bairro</Label>
                  <Input
                    value={formData.address.bairro}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, bairro: e.target.value }
                    }))}
                    placeholder="Bairro"
                    disabled={!!cepData}
                  />
                </div>
                
                <div>
                  <Label>Cidade</Label>
                  <Input
                    value={formData.address.cidade}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, cidade: e.target.value }
                    }))}
                    placeholder="Cidade"
                    disabled={!!cepData}
                  />
                </div>
                
                <div>
                  <Label>UF</Label>
                  <Input
                    value={formData.address.uf}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      address: { ...prev.address, uf: e.target.value }
                    }))}
                    placeholder="SP"
                    maxLength={2}
                    disabled={!!cepData}
                  />
                </div>
              </div>
            </div>

            {/* Informações de Entrega */}
            <div className="space-y-4">
              <h3 className="text-lg font-semibold flex items-center">
                <Clock className="w-5 h-5 mr-2 text-orange-500" />
                Informações de Entrega
              </h3>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="estimatedTime">Tempo Estimado</Label>
                  <select
                    id="estimatedTime"
                    value={formData.delivery.estimatedTime}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      delivery: { ...prev.delivery, estimatedTime: e.target.value }
                    }))}
                    className="w-full p-2 border rounded-md"
                  >
                    <option value="30-45 min">30-45 minutos</option>
                    <option value="45-60 min">45-60 minutos</option>
                    <option value="1-2h">1-2 horas</option>
                  </select>
                </div>
                
                <div>
                  <Label htmlFor="notes">Observações</Label>
                  <Input
                    id="notes"
                    value={formData.delivery.notes}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      delivery: { ...prev.delivery, notes: e.target.value }
                    }))}
                    placeholder="Instruções especiais"
                  />
                </div>
              </div>
            </div>

            {/* Resumo do Pedido */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">Resumo do Pedido</h3>
              <div className="space-y-1 text-sm">
                {items.map((item, index) => (
                  <div key={index} className="flex justify-between">
                    <span>{item.pasta_type.name} com {item.sauce.name} (x{item.quantity})</span>
                    <span>R$ {((item.pasta_type.price + item.sauce.price) * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
                <div className="border-t pt-2 mt-2 font-bold flex justify-between">
                  <span>Total:</span>
                  <span className="text-orange-500">R$ {totalPrice.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Botões */}
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={onClose}
                className="flex-1"
              >
                Cancelar
              </Button>
              <Button
                type="button"
                onClick={sendWhatsApp}
                className="flex-1 bg-green-500 hover:bg-green-600"
              >
                <Phone className="w-4 h-4 mr-2" />
                Enviar via WhatsApp
              </Button>
              <Button
                type="submit"
                className="flex-1 bg-orange-500 hover:bg-orange-600"
              >
                Confirmar Pedido
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
